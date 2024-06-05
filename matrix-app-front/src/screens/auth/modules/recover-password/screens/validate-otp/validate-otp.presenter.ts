import { useState, useEffect, useContext } from 'react';
import { TIME_RESEND_CODE, INTERVAL_TIME } from 'src/utils/constants';
import useCountDown from 'react-countdown-hook';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import moment from 'moment';
import {
  saveValue, getValue, checkValue, deleteValue,
} from 'src/utils/AsyncStorageHandler';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import IRecoverPasswordRequest from 'src/core/modules/auth/password/dtos/recover-password/recover-password-request.interface';
import RoutesEnum from 'src/shared/enums/routes/routes.enum';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { logCrashlytics } from 'src/utils/Analytics';
import {
  AuthErrorCodeEnum,
  ReCaptchaErrorsEnum,
  ScreenCurrentEnum,
} from 'src/utils/enum/error-type.enum';
import Helpers from 'src/utils/Helpers';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useRecoverPasswordInteractor from '../../interactors/recover-password.interactor';

const otpErrors = {
  default: 'El código ingresado es incorrecto',
  expired: 'El código ha caducado',
};

const useValidateOtpPresenter = (props: CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.PasswordRecoveryNavigator, 'ValidateOTP'>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>) => {
  const {
    navigation,
    route: { params },
  } = props;
  const {
    stack, isBlocked, destinationCustomFormat, documentNumber,
  } = params;

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
  const [success, setSuccess] = useState<boolean>(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpsuccess, setOtpsuccess] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [destination, setDestination] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [timeReSendCode, { start, reset }] = useCountDown(initialTime, INTERVAL_TIME);

  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();
  const { getErrorCode } = Helpers;

  const cleanData = (): void => {
    setIsError(false);
    setIsOtpLoading(false);
    setMessageError('');
    setOtpsuccess(false);
    setIsOtpError(false);
    setIsOtpLoading(false);
  };

  const validateOtpAction = useRecoverPasswordInteractor();

  const handleErrorValidateDni = (error: any) => {
    logCrashlytics({
      scope: 'API',
      fileName: 'auth/recover-password/screens/validate-otp.presenter.tsx',
      service: 'executeForgotPassword',
      error,
    });
    if (error.name) {
      setMessageError(error.name);
      setIsOtpError(true);
    } else {
      const errorCode = getErrorCode(error?.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum);
      sessionModalError.showModalError(errorCode, ScreenCurrentEnum.PASSWORD_RECOVERY);
    }
  };

  const resendCode = async (): Promise<void> => {
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      const userId = await changeUserForId(documentNumber);
      const data: IRecoverPasswordRequest = {
        username: userId || documentNumber,
        session: recaptchaToken,
      };
      try {
        await validateOtpAction.executeForgotPassword(data);
        setOtpsuccess(true);
      } catch (error: any) {
        handleErrorValidateDni(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const isSignUpProcess = stack === 'signUp';

  const getTimeDiff = async () => {
    const startTimeBlock = await getValue('timeToBlock');
    const currentDate = moment();
    const startTime = moment(startTimeBlock);
    const timeDiff = currentDate.diff(startTime, 'minutes');
    if (timeDiff === 59) {
      setIsExceededOTP(false);
      setBlockTimer(0);
      setIsEnable(true);
      await deleteValue('timeToBlock');
      start();
    } else setBlockTimer(60 - timeDiff);
  };

  const saveTime = async () => {
    const currentDate = moment();
    await saveValue('timeToBlock', currentDate);
    setBlockTimer(60);
  };

  const cleanOTPData = (): void => {
    cleanData();
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
    if (messageError === amplifyErrorCodes.exceededRequestOTP || isBlocked) {
      setIsExceededOTP(true);
      setIsEnable(false);
      setBlockTimer(60);
      resetCode();
    }
  }, [messageError]);

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setIsError(isError);
    resetCode();
    if (isError) setIsEnable(false);
  }, [isError, stack]);

  useEffect(() => {
    if (success) setIsSuccess(true);
  }, [success]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigation.navigate(RoutesEnum.NEW_PASSWORD, {
          code: otp,
          documentNumber,
        });
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    setResendSuccess(otpsuccess);
    setIsResendLoading(isOtpLoading);
    setErrorOTP(!!isOtpError);
  }, [otpsuccess, isOtpLoading, isOtpError, stack]);

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
    resendCode();
  };

  const onSubmit = async () => setSuccess(true);

  const onFinish = (otpCode: any) => {
    setOtp(otpCode);
    onSubmit();
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
    destination,
    isLoading,
  };
};

export default useValidateOtpPresenter;
