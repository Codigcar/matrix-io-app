import { useContext, useEffect } from 'react';
import { FormikHelpers } from 'formik';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import UseCheckNetworkConnection from 'src/utils/hooks/UseCheckNetworkConnection';
import IRecoverPasswordRequest from 'src/core/modules/auth/password/dtos/recover-password/recover-password-request.interface';
import RoutesEnum from 'src/shared/enums/routes/routes.enum';
import { logCrashlytics, setAnalyticRoute } from 'src/utils/Analytics';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import {
  AuthErrorCodeEnum,
  ReCaptchaErrorsEnum,
  ScreenCurrentEnum,
} from 'src/utils/enum/error-type.enum';
import Helpers from 'src/utils/Helpers';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { resetNavigation } from 'src/utils/navigationHandler';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useRecoverPasswordInteractor from '../../interactors/recover-password.interactor';

type FormValues = {
  dni: string;
};

const useValidateDniPresenter = (
  props: CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.PasswordRecoveryNavigator, 'ValidateDni'>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >,
) => {
  const vefiryDniAction = useRecoverPasswordInteractor();
  const IsNetworkConnected = UseCheckNetworkConnection();
  const ReCaptcha: any = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();
  const navigationHook = useNavigation();

  const { navigation } = props;
  const { getErrorCode } = Helpers;

  const onPressBackArrow = () => {
    if (navigationHook.canGoBack()) {
      navigation.goBack();
    } else {
      resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
    }
  };

  const isEmail = (deliveryMedium: string) => (deliveryMedium === 'SMS' ? 'phone' : 'email');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ReCaptcha.actionForgotPassword();
    });

    return unsubscribe;
  }, []);

  const handleErrorValidateDni = (error: any) => {
    logCrashlytics({
      scope: 'API',
      fileName: 'auth/recover-password/screens/validate-dni.presenter.tsx',
      service: 'executeForgotPassword',
      error,
    });
    if (error?.name === amplifyErrorCodes.exceededRequestOTP) {
      navigation.navigate(RoutesEnum.VALIDATE_OTP, { isBlocked: true });
    } else {
      const errorCode = getErrorCode(error?.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum);
      sessionModalError.showModalError(errorCode, ScreenCurrentEnum.PASSWORD_RECOVERY);
    }
  };

  const requestCode: (
    username: string,
    document: string,
    helpers: FormikHelpers<FormValues>,
  ) => Promise<void> = async (username, document, helpers) => {
    helpers.setSubmitting(true);

    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      try {
        const request: IRecoverPasswordRequest = {
          username,
          session: recaptchaToken,
        };
        const response = await vefiryDniAction.executeForgotPassword(request);
        if (response.deliveryMedium) {
          navigation.navigate(RoutesEnum.VALIDATE_OTP, {
            destination: isEmail(response.deliveryMedium || 'EMAIL'),
            documentNumber: document,
            stack: 'forgotPassword',
          });
          setAnalyticRoute('VerifyOTPRecovery');
        }
      } catch (error: any) {
        handleErrorValidateDni(error);
      } finally {
        helpers.setSubmitting(false);
      }
    } else {
      helpers.setSubmitting(false);
    }
  };

  const onPressSubmitButton = async (data: FormValues, helper: FormikHelpers<FormValues>) => {
    if (!IsNetworkConnected) {
      navigation.navigate(RoutesEnum.NETWORK_ERROR);
      return;
    }
    const { dni } = data;
    const userId = await changeUserForId(dni);
    if (userId) await requestCode(userId, dni, helper);
    else await requestCode(dni, dni, helper);
  };

  return {
    onPressBackArrow,
    onPressSubmitButton,
  };
};

export default useValidateDniPresenter;
