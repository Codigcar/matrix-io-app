import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { i18n } from 'src/utils/core/MTXStrings';
import { logResendCode } from './verify-otp.analytics';
import useForgotPasswordInteractor from './verify-otp.interactor';

const useForgotPasswordPresenter = () => {
  const navigation = useNavigation<NavigationProp<ReactNavigation.PasswordRecoveryNavigator>>();
  const { params } =
    useRoute<RouteProp<ReactNavigation.PasswordRecoveryNavigator, 'ValidateOTP'>>();
  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();
  const { executeForgotPassword } = useForgotPasswordInteractor();
  const { documentNumber } = params;
  const nextScreen = navigationScreenNames.passwordRecovery.newPassword;

  const onSubmit = async (code: string) => true;

  const afterSubmitSuccess = async (code: string) => {
    navigation.navigate(nextScreen, { code, documentNumber });
  };

  const onError = () => {};

  const onResendCode = async () => {
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (!recaptchaToken) return { hasExceededOTP: false };
    try {
      const userId = await changeUserForId(documentNumber);
      const user = userId || documentNumber;
      await executeForgotPassword({ username: user, session: recaptchaToken });
      showToast({
        type: ToastType.TypeInfo,
        title: i18n.t('verifyOTP.resend-success-code_1'),
      });
    } catch (error: any) {
      if (error?.message.includes(amplifyErrorCodes.attemptLimitExceeded)) {
        logResendCode(error);
        showToast({
          type: ToastType.TypeInfo,
          title: i18n.t('verifyOTP.resend-error-code_1'),
          message: i18n.t('verifyOTP.resend-error-code_2'),
        });
        return { hasExceededOTP: true };
      }
      sessionModalError.showModalError(error?.code, ScreenCurrentEnum.PASSWORD_RECOVERY);
    }
    return { hasExceededOTP: false };
  };

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return {
    onSubmit,
    afterSubmitSuccess,
    onError,
    onResendCode,
    onPressBackArrow,
  };
};

export default useForgotPasswordPresenter;
