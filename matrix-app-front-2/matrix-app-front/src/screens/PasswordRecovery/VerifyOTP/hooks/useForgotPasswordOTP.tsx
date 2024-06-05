import { useContext, useState } from 'react';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import { ForgotPassword } from 'src/api/AuthServices';
import { useRoute } from '@react-navigation/native';
import { logCrashlytics } from 'src/utils/Analytics';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';

const useForgotPasswordOTP = () => {
  const { params } = useRoute();
  const { documentNumber } = params;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpsuccess, setOtpsuccess] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const [messageApi, setMessageApi] = useState<string>('');
  const nextScreen = navigationScreenNames.recoveryPassword.newPassword;

  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();

  const cleanData = (): void => {
    setIsError(false);
    setIsOtpLoading(false);
    setMessageError('');
    setOtpsuccess(false);
    setIsOtpError(false);
    setIsOtpLoading(false);
  };

  const onSubmit = async () => setSuccess(true);

  const resendCode = async (): Promise<void> => {
    setIsLoading(true);
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      try {
        const userId = await changeUserForId(documentNumber);
        const user = userId || documentNumber;
        const response = await ForgotPassword(user, { session: recaptchaToken });
        setOtpsuccess(response);
      } catch (error: any) {
        if (error?.code) {
          sessionModalError.showModalError(error?.code, ScreenCurrentEnum.PASSWORD_RECOVERY);
        } else {
          logCrashlytics({
            scope: 'API',
            fileName: 'PasswordRecovery/VerifyOTP/hooks/useForgotPasswordOTP.tsx',
            service: 'ForgotPassword',
            error,
          });
          setMessageError(error?.name);
          setIsOtpError(true);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isError,
    isLoading,
    success,
    resendCode,
    isOtpError,
    otpsuccess,
    isOtpLoading,
    cleanData,
    nextScreen,
    messageApi,
    messageError,
    documentNumber,
  };
};

export default useForgotPasswordOTP;
