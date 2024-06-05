import { useState, useEffect, useRef } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { TIME_RESEND_CODE, INTERVAL_TIME } from 'src/utils/constants';
import useCountDown from 'react-countdown-hook';
import { resetNavigation } from 'src/utils/navigationHandler';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import moment from 'moment';
import {
  saveValue, getValue, checkValue, deleteValue,
} from 'src/utils/AsyncStorageHandler';
import { currentDate } from 'src/utils/date-time/date-time';
import useSignUpOTP from './useSigUpOTP';
import useChangeEmailOTP from './useChangeEmailOTP';
import useChangePhoneOTP from './useChangePhoneOTP';
import useForgotPasswordOTP from './useForgotPasswordOTP';
import useVerifyEmailOTP from './useVerifyEmailOTP';

const otpErrors = {
  default: 'El código ingresado es incorrecto',
  expired: 'El código ha caducado',
};

const useMTXVerifyOTP = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const {
    stack, isBlocked, destinationCustomFormat, destination, phone, isChangeDataProcess,
  } = params;

  const changeEmail = useChangeEmailOTP();
  const changePhone = useChangePhoneOTP();
  const signUp = useSignUpOTP();
  const forgotPassword = useForgotPasswordOTP();
  const verifyEmailOTP = useVerifyEmailOTP();
  const initialTime = TIME_RESEND_CODE * 1000;

  const initCode = Array(6).fill('');
  const [code, setCode] = useState<string[]>(initCode);
  const handlerCode = (text: string, position: number) => {
    const newCode: string[] = code.map((ele, indx) => (indx === position ? text : ele));
    setCode(newCode);
  };
  const resetCode = () => setCode(initCode);

  const [messageError, setMessageError] = useState<string>(otpErrors.default);
  const [errorOTP, setErrorOTP] = useState<boolean>(false);
  const [isEnable, setIsEnable] = useState<boolean>(true);
  const [otp, setOtp] = useState<string>('');

  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [hiddenReSendCodeButton, setHiddenReSendCodeButton] = useState<boolean>(true);
  const [isExceededOTP, setIsExceededOTP] = useState<boolean>(isBlocked);
  const [blockTimer, setBlockTimer] = useState<number>(0);

  const [timeReSendCode, {
    start, reset,
  }] = useCountDown(
    initialTime,
    INTERVAL_TIME,
  );

  const isSignUpProcess = stack === 'signUp';

  const getTimeDiff = async () => {
    const startTimeBlock = await getValue('timeToBlock');
    const startTime = moment(startTimeBlock);
    const timeDiff = currentDate().diff(startTime, 'minutes');
    if (timeDiff === 59) {
      setIsExceededOTP(false);
      setBlockTimer(0);
      setIsEnable(true);
      await deleteValue('timeToBlock');
      start();
    } else setBlockTimer(60 - timeDiff);
  };

  const saveTime = async () => {
    await saveValue('timeToBlock', currentDate());
    setBlockTimer(60);
  };

  const cleanOTPData = (): void => {
    switch (stack) {
      case 'VerifyEmail':
        verifyEmailOTP.cleanData();
        break;
      case 'email':
        changeEmail.cleanData();
        break;
      case 'phone':
        changePhone.cleanData();
        break;
      case 'signUp':
        signUp.cleanData();
        break;
      case 'forgotPassword':
        forgotPassword.cleanData();
        break;
      default:
        console.log('Clean data');
        break;
    }
  };

  useEffect(() => {
    if (!isBlocked) {
      start();
      deleteValue('timeToBlock');
    }
    const checkBlock = async () => {
      const isBlock = await checkValue('timeToBlock');
      setErrorOTP(true);
      if (!isBlock) saveTime();
      else await getTimeDiff();
    };
    if (isBlocked) checkBlock();
    return () => {
      reset();
      cleanOTPData();
    };
  }, []);

  useEffect(() => {
    if ((isExceededOTP || isBlocked) && errorOTP) {
      setTimeout(() => setErrorOTP(false), 3000);
    }
  }, [errorOTP]);

  useEffect(() => {
    const checkBlock = async () => {
      const isBlock = await checkValue('timeToBlock');
      if (!isBlock) saveTime();
      else await getTimeDiff();
    };
    if (isExceededOTP) checkBlock();
  }, [isExceededOTP]);

  useEffect(() => {
    let counterBlocker: any;
    const checkBlock = async () => {
      const isBlock = await checkValue('timeToBlock');
      if (isBlock) {
        counterBlocker = setTimeout(async () => {
          await getTimeDiff();
        }, 60000);
      }
    };
    if (isExceededOTP) checkBlock();
    return () => clearTimeout(counterBlocker);
  }, [blockTimer]);

  useEffect(() => {
    if (
      forgotPassword.messageError === amplifyErrorCodes.exceededRequestOTP
      || signUp.messageError === amplifyErrorCodes.exceededRequestOTP
      || isBlocked
    ) {
      setIsExceededOTP(true);
      setIsEnable(false);
      setBlockTimer(60);
      resetCode();
    }
  }, [forgotPassword.messageError, signUp.messageError]);

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const goToNextScreen = (screenName: string, data?: any) => {
    navigation.navigate(screenName, data);
  };

  useEffect(() => {
    switch (stack) {
      case 'VerifyEmail':
        setIsError(verifyEmailOTP.isError);
        break;
      case 'email':
        setIsError(changeEmail.isError);
        break;
      case 'phone':
        setIsError(changePhone.isError);
        break;
      case 'signUp':
        setIsError(signUp.isError);
        break;
      case 'forgotPassword':
        setIsError(forgotPassword.isError);
        setMessageError(
          forgotPassword.messageApi === 'The OTP code has expired'
            ? otpErrors.expired
            : otpErrors.default,
        );
        break;
      default:
        console.log('default');
        break;
    }
    resetCode();
    if (
      verifyEmailOTP.isError
      || changeEmail.isError
      || changePhone.isError
      || signUp.isError
      || forgotPassword.isError
    ) { setIsEnable(false); }
  }, [
    verifyEmailOTP.isError,
    changeEmail.isError,
    changePhone.isError,
    signUp.isError,
    forgotPassword.isError,
    stack,
  ]);

  useEffect(() => {
    if (
      verifyEmailOTP.success
      || changeEmail.success
      || changePhone.success
      || signUp.success
      || forgotPassword.success
    ) { setIsSuccess(true); }
  }, [
    verifyEmailOTP.success,
    changeEmail.success,
    changePhone.success,
    signUp.success,
    forgotPassword.success,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        if (verifyEmailOTP.success) {
          verifyEmailOTP.goToProfile();
        }
        if (changePhone.success) {
          changePhone.handlerPhone();
          goToNextScreen(changePhone.nextScreen, {
            isFinishedDataUpdate: true,
          });
        }
        if (changeEmail.success) {
          changeEmail.handlerEmail();
          goToNextScreen(changeEmail.nextScreen, {
            isFinishedDataUpdate: true,
          });
        }
        if (forgotPassword.success) {
          goToNextScreen(forgotPassword.nextScreen, {
            code: otp,
            documentNumber: forgotPassword.documentNumber,
          });
        }
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    switch (stack) {
      case 'VerifyEmail':
        setResendSuccess(verifyEmailOTP.otpsuccess);
        setIsResendLoading(verifyEmailOTP.isOtpLoading);
        setErrorOTP(!!verifyEmailOTP.isOtpError);
        break;
      case 'email':
        setResendSuccess(changeEmail.otpsuccess);
        setIsResendLoading(changeEmail.isOtpLoading);
        setErrorOTP(!!changeEmail.isOtpError);
        break;
      case 'phone':
        setResendSuccess(changePhone.otpsuccess);
        setIsResendLoading(changePhone.isOtpLoading);
        setErrorOTP(!!changePhone.isOtpError);
        break;
      case 'signUp':
        setResendSuccess(signUp.otpsuccess);
        setIsResendLoading(signUp.isOtpLoading);
        setErrorOTP(!!signUp.isOtpError);
        break;
      case 'forgotPassword':
        setResendSuccess(forgotPassword.otpsuccess);
        setIsResendLoading(forgotPassword.isOtpLoading);
        setErrorOTP(!!forgotPassword.isOtpError);
        break;
      default:
        console.log('default');
        break;
    }
  }, [
    verifyEmailOTP.otpsuccess,
    verifyEmailOTP.isOtpLoading,
    verifyEmailOTP.isOtpError,
    changeEmail.otpsuccess,
    changeEmail.isOtpLoading,
    changeEmail.isOtpError,
    changePhone.otpsuccess,
    changePhone.isOtpLoading,
    changePhone.isOtpError,
    signUp.otpsuccess,
    signUp.isOtpLoading,
    signUp.isOtpError,
    forgotPassword.otpsuccess,
    forgotPassword.isOtpLoading,
    forgotPassword.isOtpError,
    stack,
  ]);

  useEffect(() => {
    if (resendSuccess) {
      setHiddenReSendCodeButton(true);
      setIsEnable(true);
      setIsComplete(true);
      setIsComplete(false);
      if (!isExceededOTP) setTimeout(() => cleanOTPData(), 3000);
    }
  }, [resendSuccess]);

  useEffect(() => {
    if (timeReSendCode === 0) {
      setHiddenReSendCodeButton(false);
    }
  }, [timeReSendCode]);

  useEffect(() => {
    if (hiddenReSendCodeButton) {
      start(initialTime);
    }
  }, [hiddenReSendCodeButton]);

  // Methods

  const onPressReSendCode = () => {
    switch (stack) {
      case 'VerifyEmail':
        verifyEmailOTP.resendCode();
        break;
      case 'email':
        changeEmail.resendCode();
        break;
      case 'phone':
        changePhone.resendCode();
        break;
      case 'signUp':
        signUp.resendCode();
        break;
      case 'forgotPassword':
        forgotPassword.resendCode();
        break;
      default:
        console.log('resend code');
        break;
    }
  };

  const onFinish = (otpCode: any) => {
    switch (stack) {
      case 'VerifyEmail':
        verifyEmailOTP.onSubmit(otpCode);
        break;
      case 'email':
        changeEmail.onSubmit(otpCode);
        break;
      case 'phone':
        changePhone.onSubmit(otpCode);
        break;
      case 'signUp':
        signUp.onSubmit(otpCode);
        break;
      case 'forgotPassword':
        setOtp(otpCode);
        forgotPassword.onSubmit();
        break;
      default:
        console.log('Press submit');
        break;
    }
  };

  useEffect(() => {
    const codeText = code.toString().replace(/,|_/g, '');
    if (codeText.length === 6) {
      setIsComplete(true);
      onFinish(codeText);
    }
  }, [code]);

  useEffect(() => {
    if (isError) setTimeout(() => setIsError(false), 3000);
  }, [isError]);

  const formatPhoneNumber = (number: string) =>
    [number.slice(0, 3), number.slice(3, 6), number.slice(6, 9), number.slice(9)].join(' ');

  return {
    onPressBackArrow,
    onPressReSendCode,
    onFinish,
    isComplete,
    timeReSendCode,
    hiddenReSendCodeButton,
    messageError,
    errorOTP,
    formatPhoneNumber,
    resendSuccess,
    destinationCustomFormat,
    destination,
    isResendLoading,
    isError,
    isEnable,
    code,
    handlerCode,
    isSuccess,
    isExceededOTP,
    blockTimer,
    stack,
    isSignUpProcess,
    phone,
    isChangeDataProcess,
  };
};

export default useMTXVerifyOTP;
