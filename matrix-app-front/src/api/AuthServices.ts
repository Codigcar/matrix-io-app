import { Auth } from 'aws-amplify';
import Config from 'react-native-config';
import { logCrashlytics } from 'src/utils/Analytics';
import { authApi, baseApi, meUpdateApi } from './index';

const { WEB_POOL_ID } = Config;

export const SignUp = (props: any) => Auth.signUp(props);
export const Signin = ({ username, password }: { username: string; password: string }) =>
  Auth.signIn({ username, password });
export const ForgotPassword = (username: string, clientMetadata:
  { session: string}) =>
  Auth.forgotPassword(username, clientMetadata);
export const ConfirmSignUp = (username: string, code: string) => Auth.confirmSignUp(username, code);
export const ReSendSignUp = (username: string) => Auth.resendSignUp(username);
export const SendVerifyEmailCode = () => Auth.verifyCurrentUserAttribute('email');
export const VerifyEmail = (code: string) => Auth.verifyCurrentUserAttributeSubmit('email', code);
export const SendVerifyPhoneCode = () => Auth.verifyCurrentUserAttribute('phone_number');
export const VerifyPhone = (code: string) => Auth.verifyCurrentUserAttributeSubmit('phone_number', code);
export const GetUser = () => Auth.currentAuthenticatedUser();
export const UpdateCustomAttribute = (user: any, attribute: any) =>
  Auth.updateUserAttributes(user, attribute);
export const ConfirmPassword = (
  username: string,
  password: string,
  code: string,
  clientMetadata?: { session: string, device: string },
) => Auth.forgotPasswordSubmit(username, code, password, clientMetadata);
export const RememberDevice = () => Auth.rememberDevice();
export const RefreshToken = async () => {
  const session = await Auth.currentAuthenticatedUser({ bypassCache: true });
  return session.signInUserSession.accessToken.jwtToken;
};
export const SignOut = async () => {
  try {
    const session = await Auth.currentAuthenticatedUser();
    await authApi.post('/', {
      Token: session.signInUserSession.refreshToken.token,
      ClientId: WEB_POOL_ID,
      ClientMetadata: {
        AccessToken: session.signInUserSession.accessToken.jwtToken,
      },
    });
  } catch (error) {
    logCrashlytics({
      scope: 'API',
      fileName: 'API/Auth.ts',
      service: 'logout',
      error,
    });
  }
};

export const UpdatePhoneNumber = async (newPhone: string) => {
  try {
    await baseApi.put('/v1/me/users/address', {
      type: 'phone_number',
      value: newPhone,
    });
  } catch (error) {
    logCrashlytics({
      scope: 'API',
      fileName: 'src/api/AuthServices.ts',
      service: 'updatePhone',
      error,
    });
    throw error;
  }
};

export const UpdateEmail = async (newEmail: string) => {
  try {
    await baseApi.put('/v1/me/users/address', {
      type: 'email',
      value: newEmail,
    });
  } catch (error) {
    logCrashlytics({
      scope: 'API',
      fileName: 'src/api/AuthServices.ts',
      service: 'updateEmail',
      error,
    });
    throw error;
  }
};

export const ConfirmOTPNewPhone = async (code: string) => {
  try {
    await meUpdateApi.post('/v1/me/users/address/confirm', {
      type: 'phone_number',
      code,
    });
  } catch (error) {
    logCrashlytics({
      scope: 'API',
      fileName: 'src/api/AuthServices.ts',
      service: 'confirmOTPNewPhone',
      error,
    });
    throw error;
  }
};

export const ConfirmOTPNewEmail = async (code: string) => {
  try {
    await meUpdateApi.post('/v1/me/users/address/confirm', {
      type: 'email',
      code,
    });
  } catch (error) {
    logCrashlytics({
      scope: 'API',
      fileName: 'src/api/AuthServices.ts',
      service: 'confirmOTPNewEmail',
      error,
    });
    throw error;
  }
};

export default {
  Signin,
  SignUp,
  ForgotPassword,
  ConfirmSignUp,
  ReSendSignUp,
  SendVerifyEmailCode,
  VerifyEmail,
  SignOut,
  GetUser,
  RememberDevice,
  UpdatePhoneNumber,
  UpdateEmail,
  ConfirmOTPNewPhone,
  ConfirmOTPNewEmail,
};
