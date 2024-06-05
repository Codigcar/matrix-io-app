import { useState } from 'react';
import { SendVerifyEmailCode } from 'src/api/AuthServices';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { i18n } from 'src/utils/core/MTXStrings';
import { setVerifyEmail } from 'src/store/states/sessionStates';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics } from 'src/utils/Analytics';
import { VerifyEmail } from 'src/api/AuthServices';

const useVerifyEmailOTP = () => {
  const { params } = useRoute();
  const { origin } = params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpsuccess, setOtpsuccess] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');

  const goToProfile = () => {
    dispatch(setVerifyEmail());
    if (origin === navigationScreenNames.home) {
      navigation.navigate(navigationScreenNames.bottomTabNavigator);
    } else {
      navigation.navigate({
        name: navigationScreenNames.myProfile,
        params: { message: i18n.t('email-verified-message'), isChangedValue: true },
        merge: true,
      });
    }
  };

  const onSubmit = async (code: string): Promise<void> => {
    setIsLoading(true);
    try {
      await VerifyEmail(code);
      setSuccess(true);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/VerifyOTP/hooks/useVerifyEmailOTP.tsx',
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
    setMessageError('');
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
      console.log('resendCode : ', error);
      // setMessageError(error.name);
      setIsOtpError(true);
    } finally {
      setIsOtpLoading(false);
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
    goToProfile,
    messageError,
  };
};

export default useVerifyEmailOTP;
