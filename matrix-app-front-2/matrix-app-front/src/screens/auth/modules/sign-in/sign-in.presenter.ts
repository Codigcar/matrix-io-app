import { FormikHelpers } from 'formik';
import { NavigationPropsType } from 'src/types/types';
import { deleteValue } from 'src/utils/AsyncStorageHandler';
import { Linking } from 'react-native';
import { getVersion } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import semver from 'semver';
import { logout, signInSuccess } from 'src/utils/auth/states/signInStates';
import {
  setUserData,
  setToken,
  setAccountState,
  setInactivityTimeout,
  setReCaptchaSessionToken,
} from 'src/store/states/sessionStates';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  useState, useCallback, useRef, MutableRefObject, useContext, useEffect,
} from 'react';
import { FormValues } from 'src/components/Form/form.props';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { analyticsManagerProvider, AnalyticsProviderType, AFLoggerEvents } from 'src/shared/providers/analytics/index';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import UseCheckNetworkConnection from 'src/utils/hooks/UseCheckNetworkConnection';
import useEventHandler from 'src/utils/eventsHandler/userEventHandler';
import { onboardingData } from 'src/api/Onboarding';
import CardReplacementServices from 'src/api/CardReplacementServices';
import { customLogin } from 'src/utils/seed/customAuth';
import { resetNavigation, resetNavigationToScreen } from 'src/utils/navigationHandler';
import { onboardingStates } from 'src/utils/eventsHandler/eventList';
import {
  LIVENESS_STEPS,
  INACTIVITY_TIMEOUTS,
  CODE_LOCKED_AFTER_FAILED_ATTEMPTS,
  SECOND_DEVICE_NOT_ALLOWED,
  ios,
} from 'src/utils/constants';
import { Auth } from 'aws-amplify';
import { AuthConfig } from 'src/utils/auth/config';
import { authErrorList, amplifyErrorCodes } from 'src/utils/auth/errorList';
import { saveValueCipher } from 'src/utils/CryptoDataHandler';
import getLastUserStatus from 'src/api/UserServices';
import Helpers from 'src/utils/Helpers';
import CardServices from 'src/api/CardOfferServices';
import { SignOut } from 'src/api/AuthServices';
import { UserProps, userStatus } from 'src/api/types/userTypes';
import CardCancellationServices, { IDataCardCancellation } from 'src/api/CardCancellationServices';
import { OnboardingProps } from 'src/api/types/onboradingTypes';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import getDeviceMetadata from 'src/utils/metadataClient';
import { ModalContext } from 'src/store/states/modalsContext';
import { resetAttempts, registerAttempts } from 'src/utils/auth/loginLocked';
import { AuthErrorCodeEnum, ReCaptchaErrorsEnum } from 'src/utils/enum/error-type.enum';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { useRemoteConfigGetValue } from 'src/shared/providers/remote-config';
import { navigationRef } from 'src/navigators/RootNavigation';
import { CommonActions } from '@react-navigation/native';
import { FetchForceUpdate, ForceUpdateVariant } from './components/ForceUpdateModal/ForceUpdateModal';

interface FetchResultsProps {
  lastUserStatusResult?: UserProps | void;
  onboardingDataResult?: OnboardingProps | void;
  cancellationStatusResult?: IDataCardCancellation[] | void;
}

export const useSigInPresenter = (propsNavigation: NavigationPropsType, identitySaved?: string) => {
  const { navigation } = propsNavigation;
  const eventHandler = useEventHandler();
  const dispatch = useDispatch();
  const IsNetworkConnected = UseCheckNetworkConnection();
  const { updateBlockLoginModal } = useContext(ModalContext);
  const {
    forceUpdateModal: showForceUpdateModal,
    updateForceUpdateModal,
  } = useContext(ModalContext);
  const [minRemoteVersion, setMinRemoteVersion] = useState<ForceUpdateVariant | null>(null);

  const [errorAuth] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMaintenance, setIsMaintenance] = useState<boolean>(false);
  const [isLoadingReissues, setIsLoadingReissues] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loginBlockType, setLoginBlockType] = useState<string>(authErrorList[0]);
  const [firstName, setFirstName] = useState<string | null>(null);

  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();
  const content: MutableRefObject<FetchResultsProps> = useRef({});
  const { getErrorCode } = Helpers;
  const resultForceUpdate = useRemoteConfigGetValue('forceUpdatedValues').value?.asString();
  const isMaintenanceApp: boolean = useRemoteConfigGetValue('isMaintenanceApp').value?.asBoolean();

  const closeModal = () => {
    setIsModalOpen(false);
    navigation.navigate(AuthRoutesEnum.SIGN_IN);
  };

  const Logout = () => {
    SignOut();
    dispatch(logout());
  };

  const goToGenericError = () =>
    navigation.navigate(navigationScreenNames.genericError, {
      nextScreen: AuthRoutesEnum.SIGN_IN,
      title: i18n.t('cardReissue.error.errorTitle'),
      subtitle: i18n.t('cardReissue.error.errorSubtitle'),
      text: i18n.t('cardReissue.error.errorDescription'),
      buttonLabel: i18n.t('cardReissue.error.errorButtonLabel'),
    });

  const logError = (service: string, error: Error | unknown) =>
    logCrashlytics({
      scope: 'API',
      fileName: 'Login/hooks/useAuthentication.ts',
      service,
      error,
    });

  const verifyAccountStatus = () => {
    const cancellationStatus = content.current.cancellationStatusResult;
    if (cancellationStatus) {
      const applications = cancellationStatus.length;
      if (applications) {
        dispatch(setAccountState(cancellationStatus[applications - 1].status));
      }
    }
  };

  const checkOnboardingEvent = (isUserAvailable: boolean) => {
    const response = content.current.onboardingDataResult;
    if (response) {
      const isNotOnboardingCompleted = response.status !== onboardingStates.onboardingCompleted;
      if (response.user) {
        const {
          name, lastName, documentNumber, location,
        } = response.user;
        const accountId = response?.account?.id;
        const userDataPayload = {
          name,
          lastName,
          documentNumber,
          location,
          accountId,
        };
        setIsLoading(false);
        dispatch(setUserData(userDataPayload));
      }
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp01',
        seccion: 'Exito',
        tipoEvento: 'Ingreso Exitoso',
        tipoElemento: 'Boton',
        valor: 'Ingresar a mi cuenta',
      });
      if (isNotOnboardingCompleted) {
        setIsLoading(false);
        dispatch(setInactivityTimeout(INACTIVITY_TIMEOUTS.onboarding));
      }
      verifyAccountStatus();
      setIsLoading(false);
      if (isUserAvailable) eventHandler.goTo(response.status);
    }
  };

  const checkUserStatus = () => {
    const user = content.current.lastUserStatusResult;
    const response = content.current.onboardingDataResult;
    if (user && response) {
      const userAvailable = user.status !== userStatus.restoringProduct;
      if (!userAvailable) {
        checkOnboardingEvent(userAvailable);
        resetNavigation(navigation, navigationScreenNames.cardReplacement.stack);
      } else if (user.status === userStatus.fraudHold) {
        const { name } = response.user;
        setFirstName(Helpers.formatStringCamel(name.split(' ')[0]));
        setIsModalOpen(true);
        setLoginBlockType('fraud_blocked');
      } else {
        checkOnboardingEvent(userAvailable);
      }
    }
  };

  const fetchContent = (): Promise<void> => {
    const fetchUserInfo = getLastUserStatus().catch((error) => {
      logError('checkUserStatus', error);
      throw error;
    });
    const fetchOnboardingInfo = onboardingData().catch((error) => {
      logError('getOnboardingSummary', error);
      throw error;
    });
    const fetchCancellationStatus = CardCancellationServices.getCardCancellationRequest().catch(
      (error) => {
        logError('getCardCancellationRequest', error);
        throw error;
      },
    );

    return Promise.all([fetchUserInfo, fetchOnboardingInfo, fetchCancellationStatus])
      .then((data) => {
        content.current = {
          lastUserStatusResult: data[0],
          onboardingDataResult: data[1],
          cancellationStatusResult: data[2],
        };
        checkUserStatus();
      })
      .catch((error) => {
        throw error;
      });
  };

  const storageUserIdentity = async (values: FormValues): Promise<void> => {
    const { rememberMe, dni } = values;
    if (rememberMe) await saveValueCipher('dni', dni);
    if (!rememberMe && !!identitySaved) await deleteValue('dni');
  };

  const getSubString = (text: string) => text.split('/')[1];

  const handlerLoginBlock = (error: any) => {
    if (error.code === amplifyErrorCodes.userBlocked) {
      setFirstName(Helpers.capitalizeWord(getSubString(error.message)));
    }
  };

  const showBlockLoginModal = () => {
    setTimeout(() => {
      updateBlockLoginModal(true);
    }, 500);
  };

  const handlerLoginError = async (error: any, actions: any, username: string) => {
    logCrashlytics({
      scope: 'API',
      fileName: 'auth/modules/sign-in.presenter',
      service: 'AwsAmplify Auth.signIn',
      error,
    });
    if (authErrorList.includes(error?.code)) {
      if (error?.code === SECOND_DEVICE_NOT_ALLOWED) resetAttempts(username);
      setIsModalOpen(true);
      setLoginBlockType(error.code);
      handlerLoginBlock(error);
    } else if (error?.code === CODE_LOCKED_AFTER_FAILED_ATTEMPTS) {
      showBlockLoginModal();
    } else if (error?.code === AuthErrorCodeEnum.NO_AUTHORIZED_EXCEPTION) {
      registerAttempts(username);
      actions?.setErrors({
        dni: i18n.t('loginFlow.errorMessage'),
        passwordLogin: i18n.t('loginFlow.errorMessage'),
      });
    } else {
      const errorCode = getErrorCode(error.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum);
      sessionModalError.showModalError(errorCode);
    }
    logError('Signin', error);
  };

  const onSubmitAuth = async (
    values: {
      dni: string;
      passwordLogin: string;
      rememberMe: boolean;
    },
    actions?: FormikHelpers<{
      dni: string;
      passwordLogin: string;
      rememberMe: boolean;
    }>,
  ) => {
    if (!IsNetworkConnected) {
      navigation.navigate(navigationScreenNames.networkError);
      actions?.setSubmitting(false);
      return;
    }
    setIsLoading(true);
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      Auth.configure(AuthConfig);
      const { dni, passwordLogin } = values;
      try {
        const userId = await changeUserForId(dni);
        const username = userId || dni;
        const device = await getDeviceMetadata();
        actions?.setSubmitting(true);
        const response = await Auth.signIn(username, passwordLogin, {
          session: recaptchaToken,
          device,
        });
        await storageUserIdentity(values);
        analyticsManagerProvider.logEventWithType(
          {
            tipoZona: 'Login',
            zona: 'Inicio',
            subZona: 'Inicio',
            tipoEvento: 'Ingreso Exitoso',
            tipoElemento: 'Botón',
            valor: 'Iniciar sesión',
          },
          AnalyticsProviderType.appsFlyer,
          AFLoggerEvents.login,
        );
        dispatch(setToken(response.signInUserSession.accessToken.jwtToken));
        dispatch(signInSuccess(response));
        dispatch(setReCaptchaSessionToken(null));
        fetchContent();
        setIsLoading(false);
        resetAttempts(dni);
      } catch (error: any) {
        setIsLoading(false);
        handlerLoginError(error, actions, dni);
      } finally {
        actions?.setSubmitting(false);
        setIsLoading(false);
      }
    } else {
      actions?.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const newDeviceAuth = async (values: FormValues) => {
    setIsLoading(true);
    setIsModalOpen(false);
    try {
      const { dni, passwordLogin } = values;
      const response = await customLogin(dni, passwordLogin);
      setIsLoading(false);
      resetNavigationToScreen(
        navigation,
        ['EnrollmentDevice', navigationScreenNames.enrollmentDevice.intro],
        {
          signedUrl: response.challengeParam.s3SignedUrl,
          instructions: [LIVENESS_STEPS.passiveLiveness],
          process: loginBlockType === amplifyErrorCodes.userBlocked ? 'userBlocked' : 'seed',
          session: JSON.stringify(response),
          validationId: response.challengeParam.validationId,
        },
      );
    } catch (error) {
      setIsLoading(false);
      logCrashlytics({
        scope: 'API',
        fileName: 'Login/hooks/useAuthentication.ts',
        service: 'CustomAuth',
        error,
      });
      logError('CustomAuth', error);
      navigation.navigate(navigationScreenNames.genericError, {
        title: i18n.t('userBlocked.error-modal.title'),
        subtitle: i18n.t('userBlocked.error-modal.subtitle'),
        buttonLabel: i18n.t('userBlocked.error-modal.submit-text'),
      });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ReCaptcha.actionLogin();
    });

    return unsubscribe;
  }, []);

  const onSubmitReissues = async () => {
    setIsLoadingReissues(true);
    try {
      const { getCards } = CardServices;
      const { data: myCards } = await getCards();
      await CardReplacementServices.replacementCardReissues(myCards[0].id);
      setIsLoadingReissues(false);
      navigation.navigate('CardReplacementStack', { screen: 'ReplacementSummaryOffer' });
    } catch (error) {
      setIsLoadingReissues(false);
      goToGenericError();
      logCrashlytics({
        scope: 'API',
        fileName: 'Login/hooks/useAuthentication.ts',
        service: 'Card Reissue',
        error,
      });
      logError('Card Reissue', error);
    }
  };

  const closeInfoModal = useCallback(() => {
    setIsLoadingReissues(false);
  }, []);

  const checkIfNeedsForceUpdate = () => {
    const currentVersion = getVersion();

    if ((resultForceUpdate || '')?.length > 0) {
      const resultParseForceUpdate: FetchForceUpdate = JSON.parse(resultForceUpdate!);
      const remoteVersion: ForceUpdateVariant = ios
        ? resultParseForceUpdate.iOS
        : resultParseForceUpdate.android;
      if (
        !showForceUpdateModal
        && remoteVersion
        && semver.gt(remoteVersion.minVersion, currentVersion)
      ) {
        setMinRemoteVersion(remoteVersion);
        updateForceUpdateModal(true);
      }
    }
  };

  const onUpdatePress = () => {
    if (minRemoteVersion && minRemoteVersion?.url) {
      Linking.openURL(minRemoteVersion!.url);
    }
  };

  useEffect(() => {
    checkIfNeedsForceUpdate();
  }, [resultForceUpdate]);

  const goToMaintenanceScreen = () => {
    const findAuthScreen = (navigationRef?.current?.getState()?.routes || [])
      .find((row: { name: string }) => row.name === AuthRoutesEnum.AUTH_STACK);

    if (isMaintenance && findAuthScreen) {
      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: navigationScreenNames.maintenance }],
        }),
      );
    }
  };

  useEffect(() => {
    setIsMaintenance(isMaintenanceApp);
  }, [isMaintenanceApp]);

  useEffect(() => {
    goToMaintenanceScreen();
  }, [isMaintenance]);

  return {
    onSubmitAuth,
    identitySaved,
    errorAuth,
    isLoading,
    isLoadingReissues,
    onSubmitReissues,
    closeInfoModal,
    isModalOpen,
    closeModal,
    newDeviceAuth,
    loginBlockType,
    firstName,
    Logout,
    checkIfNeedsForceUpdate,
    onUpdatePress,
    showForceUpdateModal,
  };
};

export default useSigInPresenter;
