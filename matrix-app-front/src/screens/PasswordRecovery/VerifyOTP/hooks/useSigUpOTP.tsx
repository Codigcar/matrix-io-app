import { useContext, useEffect, useState } from 'react';
import { ConfirmSignUp, ReSendSignUp } from 'src/api/AuthServices';
import { useNavigation, useRoute } from '@react-navigation/native';
import { logCrashlytics } from 'src/utils/Analytics';
import { Auth } from 'aws-amplify';
import { AuthConfig } from 'src/utils/auth/config';
import { useDispatch } from 'react-redux';
import { setToken } from 'src/utils/auth/states/signInStates';
import { setToken as newSetToken, setReCaptchaSessionToken } from 'src/core/libraries-implementation/state-manager/states';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import { resetNavigation } from 'src/utils/navigationHandler';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import {
  AuthErrorCodeEnum,
  ReCaptchaErrorsEnum,
  ScreenCurrentEnum,
} from 'src/utils/enum/error-type.enum';
import getDeviceMetadata from 'src/utils/metadataClient';
import Helpers from 'src/utils/Helpers';

const useSignUpOTP = () => {
  const { params } = useRoute<any>();
  const { id, password } = params;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const [otpsuccess, setOtpsuccess] = useState<boolean>(false);
  const [isOtpLoading, setIsOtpLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>('');
  const nextScreen = 'Enrollment';
  const [isVerified, setIsVerified] = useState(false);
  const ReCaptcha = useContext(ReCaptchaContext);
  const navigation = useNavigation();
  const sessionModalError = useReCaptchaModalError();
  const { getErrorCode } = Helpers;

  const dispatch = useDispatch();

  const onSubmit = async (code: string): Promise<void> => {
    setIsLoading(true);
    try {
      await ConfirmSignUp(id, code);
      setIsVerified(true);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/VerifyOTP/hooks/useSigUpOTP.tsx',
        service: 'ConfirmSignUp',
        error,
      });
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorValidateDni = (error: any) => {
    logCrashlytics({
      scope: 'API',
      fileName: 'PasswordRecovery/VerifyOTP/hooks/useSignUpOTP.tsx',
      service: 'signIn',
      error,
    });
    const errorCode = getErrorCode(error?.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum);
    sessionModalError.showModalError(errorCode, ScreenCurrentEnum.AUTO_SIGN_IN);
  };

  useEffect(() => {
    const signIn = async () => {
      const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
      if (recaptchaToken) {
        try {
          Auth.configure(AuthConfig);
          const device = await getDeviceMetadata();
          const session = await Auth.signIn(id, password, { session: recaptchaToken, device });
          dispatch(setToken(session.signInUserSession.accessToken.jwtToken));
          dispatch(newSetToken(session.signInUserSession.accessToken.jwtToken));
          resetNavigation(navigation, nextScreen);
        } catch (error: any) {
          handleErrorValidateDni(error);
        } finally {
          dispatch(setReCaptchaSessionToken(null));
        }
      } else {
        dispatch(setReCaptchaSessionToken(null));
      }
    };
    if (isVerified) {
      signIn();
      setSuccess(true);
    }
  }, [isVerified]);

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
      await ReSendSignUp(id);
      setOtpsuccess(true);
    } catch (error: any) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PasswordRecovery/VerifyOTP/hooks/useSigUpOTP.tsx',
        service: 'ReSendSignUp',
        error,
      });
      setMessageError(error.name);
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
    nextScreen,
    messageError,
  };
};

export default useSignUpOTP;
