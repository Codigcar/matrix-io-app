import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SendVerifyPhoneCode, ConfirmOTPNewPhone } from 'src/api/AuthServices';
import { logCrashlytics } from 'src/utils/Analytics';

const getDataSelector = (state: any) => state.session?.user;

const useChangePhoneOTP = () => {
  const getData = useSelector(getDataSelector);
  const { email } = getData;
  const [isError, setIsError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpsuccess, setOtpsuccess] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const nextScreen = 'MyProfile';

  const handlerPhone = (): void => {
  };

  const cleanData = (): void => {
    setIsError(false);
    setIsOtpLoading(false);
    setMessageError('');
    setOtpsuccess(false);
    setIsOtpError(false);
    setIsOtpLoading(false);
  };

  const onSubmit = async (code: string): Promise<void> => {
    setIsLoading(true);
    try {
      await ConfirmOTPNewPhone(code);
      setSuccess(true);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/VerifyOTP/hooks/useChangePhoneOTP.tsx',
        service: 'VerifyOTPServices.verifyPhone',
        error,
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async (): Promise<void> => {
    setIsOtpLoading(true);
    try {
      await SendVerifyPhoneCode();
      setOtpsuccess(true);
    } catch (error) {
      setIsOtpError(true);
    } finally {
      setIsOtpLoading(false);
    }
  };

  return {
    onSubmit,
    email,
    isError,
    isLoading,
    success,
    resendCode,
    handlerPhone,
    isOtpError,
    otpsuccess,
    isOtpLoading,
    cleanData,
    nextScreen,
    messageError,
  };
};

export default useChangePhoneOTP;
