import { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { useSelector } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  onboardingStates,
  onboarding,
  PROOF_OF_LIFE_FAILED_DECLINED_REASONS_MESSAGES,
} from 'src/utils/constants';
import { resetNavigation } from 'src/utils/navigationHandler';
import { startPersonalData } from 'src/api/Onboarding';

type ScreensStatusType = Record<
  'success' | 'failed' | 'userBlocked',
  { title: string; subTitle?: string; description: string; buttonLabel: string; hasImage: boolean }
>;

const screensStatus: ScreensStatusType = {
  success: {
    title: i18n.t('kyc-liveness-response-title-success'),
    description: i18n.t('kyc-liveness-response-text-success'),
    buttonLabel: i18n.t('kyc-liveness-response-button-label'),
    hasImage: false,
  },
  failed: {
    title: i18n.t('kyc-liveness-response-title-failure'),
    subTitle: i18n.t('kyc-liveness-response-heading-failure'),
    description: i18n.t('kyc-liveness-response-text-failure'),
    buttonLabel: i18n.t('button-label-try-again'),
    hasImage: true,
  },
  userBlocked: {
    title: i18n.t('userBlocked.unblocekd-screen.title'),
    description: i18n.t('userBlocked.unblocekd-screen.subtitle'),
    buttonLabel: i18n.t('userBlocked.unblocekd-screen.submit-text'),
    hasImage: false,
  },
};

const userDataSelector = (state: any) => state.session.user;

const UseGoToGetPersonalData = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const {
    isOk,
    onboardingStatus,
    process,
    declinedReason,
  } = params;
  const userData = useSelector(userDataSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const livenessStatus = onboardingStatus === onboardingStates.proofOfLifeCompleted || isOk
    ? 'success'
    : 'failed';
  const status = process === 'userBlocked' ? 'userBlocked' : livenessStatus;
  const screenStatus = screensStatus[status];
  const isOnboarding = process === onboarding;

  useEffect(() => {
    if (status === 'success') {
      logVirtualEventAnalytics({
        screenName: navigationScreenNames.livenessGoToGetPersonalData,
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Mensaje felicitaciones',
        valor: 'Felicidades',
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !(onboardingStatus === onboardingStates.proofOfLifeCompleted && isOk)) {
      logVirtualEventAnalytics({
        screenName: 'LivenessValidationInProcess',
        seccion: 'Error',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'No pudimos validar tu identidad',
      });
    }
  }, [onboardingStatus, isOk, isLoading]);

  const formatUserName = (name: string) => {
    const firstName = name.split(' ')[0];
    return firstName.split(' ')[0].charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  const renderTitle = () => {
    if (status === 'success' || process === 'userBlocked') {
      return `${screenStatus.title}\n${formatUserName(userData.name)}!`;
    }
    return screenStatus.title;
  };

  const failureMsg = () => {
    let messageKey;
    if (declinedReason) {
      messageKey = PROOF_OF_LIFE_FAILED_DECLINED_REASONS_MESSAGES[declinedReason?.code];
    } else {
      messageKey = 'kyc-liveness-response-text-failure';
    }
    return i18n.t(messageKey);
  };

  const goToPersonalData = async () => {
    try {
      setIsLoading(true);
      const response = await startPersonalData();
      setIsLoading(false);
      if (response.code === 'successful_request') {
        resetNavigation(navigation, navigationScreenNames.personalDataStack);
      } else {
        navigation.navigate(navigationScreenNames.genericError);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/Liveness/GoToGetPersonalData/hooks/useGoToGetPersonalData.tsx',
        service: 'fulfillmentStart',
        error,
      });
      setIsLoading(false);
      navigation.navigate(navigationScreenNames.genericError);
    }
  };

  const goToOffer = async () => {
    // ELiminar logica proccess User Blocked
  };

  const onContinuePress = async () => {
    if (isOnboarding) await goToPersonalData();
    else goToOffer();
  };

  const onRetryPress = () => {
    resetNavigation(navigation, navigationScreenNames.livenessIntro);
  };

  const onButtonPress = (status === 'success' || status === 'userBlocked')
    ? onContinuePress
    : onRetryPress;

  return {
    onButtonPress,
    renderTitle,
    status,
    process,
    screenStatus,
    isLoading,
    failureMsg,
  };
};

export default UseGoToGetPersonalData;
