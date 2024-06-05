import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SendVerifyEmailCode, ConfirmOTPNewEmail } from 'src/api/AuthServices';
import { logCrashlytics } from 'src/utils/Analytics';

const getDataSelector = (state: any) => state.session?.user;

const useChangeEmailOTP = () => {
  const getData = useSelector(getDataSelector);
  const { phoneNumber } = getData;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpsuccess, setOtpsuccess] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  const nextScreen = 'MyProfile';

  const handlerEmail = (): void => {
  };

  const onSubmit = async (code: string): Promise<void> => {
    setIsLoading(true);
    try {
      await ConfirmOTPNewEmail(code);
      setSuccess(true);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/VerifyOTP/hooks/useChangeEmailOTP.tsx',
        service: 'VerifyOTPServices.verifyEmail',
        error,
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const cleanData = (): void => {
    setIsError(false);
    setIsOtpLoading(false);
    setOtpsuccess(false);
    setIsOtpError(false);
    setIsOtpLoading(false);
  };

  const resendCode = async (): Promise<void> => {
    setIsOtpLoading(true);
    try {
      await SendVerifyEmailCode();
      setOtpsuccess(true);
    } catch (error) {
      // setMessageError(error.name);
      setIsOtpError(true);
    } finally {
      setIsOtpLoading(false);
    }
  };

  return {
    onSubmit,
    phoneNumber,
    isError,
    isLoading,
    success,
    handlerEmail,
    resendCode,
    isOtpError,
    otpsuccess,
    isOtpLoading,
    cleanData,
    nextScreen,
  };
};

export default useChangeEmailOTP;
