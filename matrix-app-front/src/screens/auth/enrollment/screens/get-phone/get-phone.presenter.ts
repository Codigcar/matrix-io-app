import { useContext, useEffect } from 'react';
import { FormikHelpers } from 'formik';
import uuid from 'react-native-uuid';
import {
  NavigationProp, RouteProp, useNavigation, useRoute,
} from '@react-navigation/native';
import { PREFIX_NUMBER } from 'src/utils/constants';
import { saveSignUpData } from 'src/utils/auth/dataHandler';
import { i18n } from 'src/utils/core/MTXStrings';
import UseCheckNetworkConnection from 'src/utils/hooks/UseCheckNetworkConnection';
import { DeliveryMediumEnum, DeliveryOptionsEnum } from 'src/shared/enums/constants.enum';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { setAnalyticRoute } from 'src/utils/Analytics';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import {
  AuthErrorCodeEnum,
  ReCaptchaErrorsEnum,
  ScreenCurrentEnum,
} from 'src/utils/enum/error-type.enum';
import getDeviceMetadata from 'src/utils/metadataClient';
import { cryptPwd } from 'src/utils/CryptoDataHandler';
import { RegexGetHexValues } from 'src/utils/regex/InputValidator';
import { resetNavigation } from 'src/utils/navigationHandler';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import ErrorMessageEnum from 'src/shared/enums/error-message.enum';
import Helpers from 'src/utils/Helpers';
import { useRemoteConfigGetValue } from 'src/shared/providers/remote-config';
import { IGetPhoneForm } from './get-phone.definitions';
import useGetPhoneInteractor from './get-phone.interactor';
import { logClickEvent, logCrashlyticsSignUp } from './get-phone.analytics';

const useGetPhonePresenter = () => {
  const navigation = useNavigation<NavigationProp<ReactNavigation.EnrollmentNavigator>>();
  const { params } = useRoute<RouteProp<ReactNavigation.EnrollmentNavigator, 'GetPhone'>>();
  const { getErrorCode } = Helpers;
  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();
  const IsNetworkConnected = UseCheckNetworkConnection();
  const getPhoneInteractor = useGetPhoneInteractor();
  const enableReferralCode = useRemoteConfigGetValue('enableReferralCode').value?.asBoolean();

  const { email, documentNumber, password } = params;

  const retrieveNotLeadToken = (error: Error) => {
    const match = error.message.match(RegexGetHexValues);
    return match?.[0];
  };

  const onPressBackArrow = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
  };

  const getDeliveryMedium = (deliveryMedium = DeliveryOptionsEnum.SMS) => (deliveryMedium === DeliveryOptionsEnum.SMS
    ? DeliveryMediumEnum.CELULAR
    : DeliveryMediumEnum.CORREO);

  const userErrorSignUp = (error: Error) => {
    let errorCode: string | null;
    if (error.message.includes(ErrorMessageEnum.USER_REGISTERED)) {
      errorCode = 'dni-registered';
    } else if (error.message.includes(ErrorMessageEnum.PHONE_INVALID)) {
      errorCode = 'phone-invalid';
    } else if (error.message.includes(ErrorMessageEnum.PHONE_REGISTERED)) {
      errorCode = 'dni-registered';
    } else {
      errorCode = null;
    }

    return errorCode;
  };

  const handlerSignUpError = (error: any, formikHelpers: FormikHelpers<IGetPhoneForm>) => {
    logCrashlyticsSignUp(error);
    const token = retrieveNotLeadToken(error as Error);
    if (token) {
      navigation.navigate(navigationScreenNames.offerUnavailable, { token });
    } else if (userErrorSignUp(error as Error)) {
      formikHelpers.setErrors({
        phone: i18n.t(`enrollment-${userErrorSignUp(error as Error)}`),
      });
    } else if (error.message.includes(amplifyErrorCodes.invalidCode)) {
      formikHelpers.setErrors({
        referralCode: i18n.t('enrollment-referral-code-error'),
      });
    } else {
      const errorCode = getErrorCode(error?.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum);
      sessionModalError.showModalError(errorCode, ScreenCurrentEnum.SIGN_UP);
    }
  };

  const onPressContinue = async (
    data: IGetPhoneForm,
    formikHelpers: FormikHelpers<IGetPhoneForm>,
  ) => {
    if (!IsNetworkConnected) {
      navigation.navigate(navigationScreenNames.networkError);
      return;
    }
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (!recaptchaToken) return;

    const { phone, referralCode } = data;
    const username = uuid.v4();
    const device = await getDeviceMetadata();
    const passwordCrypt = await cryptPwd(password);
    try {
      const signUpInfo = {
        username: username.toString(),
        password: passwordCrypt,
        phoneNumber: `+${PREFIX_NUMBER}${phone.replace(/ /g, '')}`,
        email,
        referralCode,
        documentNumber,
        session: recaptchaToken,
        device,
      };
      const { userSub, deliveryMedium } = await getPhoneInteractor.signUp(signUpInfo);
      if (deliveryMedium) {
        await saveSignUpData(username.toString(), documentNumber, userSub);
        logClickEvent();
        formikHelpers.setErrors({ phone: undefined, referralCode: undefined });
        navigation.navigate(navigationScreenNames.verifyOTP, {
          stack: 'signUp',
          destination: getDeliveryMedium(deliveryMedium),
          id: username,
          password,
        });
        setAnalyticRoute('VerifyOTPRegister');
      }
    } catch (error: any) {
      handlerSignUpError(error, formikHelpers);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ReCaptcha.actionSignUp();
    });

    return unsubscribe;
  }, []);

  return {
    onPressBackArrow,
    onPressContinue,
    enableReferralCode,
  };
};

export default useGetPhonePresenter;
