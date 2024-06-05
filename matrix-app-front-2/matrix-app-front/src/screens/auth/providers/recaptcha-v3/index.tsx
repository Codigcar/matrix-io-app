/* eslint-disable max-len */
import React, {
  createContext, useCallback, useMemo, useRef, useState,
} from 'react';
import {
  ScreenCurrentEnum,
  ReCaptchaErrorsEnum,
  AuthErrorCodeEnum,
} from 'src/utils/enum/error-type.enum';
import { logCrashlytics } from 'src/utils/Analytics';
import { setReCaptchaSessionToken } from 'src/store/states/sessionStates';
import { useDispatch, useSelector } from 'react-redux';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IRecaptchaSessionRequest } from 'src/core/modules/auth/session/dtos/recaptcha-session/recaptcha-session-request.interface';
import { RecaptchaVersionEnum } from 'src/core/modules/auth/session/enums/recaptcha-version.enum';
import Helpers from 'src/utils/Helpers';
import ReCaptchaComponent from '../../components/ReCaptchaV3';
import useReCaptchaModalError from '../../components/AuthModalError/use-auth-modal-error';
import useAuthInteractor from '../../interactors/auth.interactor';

export type IProps = {
  captchaDomain: string;
  siteKey: string;
};

type ReCaptchaContextType = {
  invokeReCaptchaSessionToken: any;
  actionSignUp: () => void;
  actionForgotPassword: () => void;
  actionLogin: () => void;
};

export const ReCaptchaContext = createContext<ReCaptchaContextType>({
  invokeReCaptchaSessionToken: () => {},
  actionSignUp: () => {},
  actionForgotPassword: () => {},
  actionLogin: () => {},
});

// Selector to get the reCaptcha session token from the state
const reCaptchaSessionTokenSelector = (store: any) => store.session.reCaptchaSessionToken;

// ReCaptcha provider component
export const ReCaptchaProvider: React.FC<IProps> = ({ children, captchaDomain, siteKey }) => {
  const reCaptchaRef = useRef<any>(null);
  const sessionModalError = useReCaptchaModalError();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ReactNavigation.AuthNavigator, 'Challenge'>>();
  const authInteractor = useAuthInteractor();
  const { getErrorCode } = Helpers;

  const reCaptchaSessionToken = useSelector(reCaptchaSessionTokenSelector);

  // State for the current action (SIGN_UP, PASSWORD_RECOVERY, LOGIN)
  const [action, setAction] = useState<ScreenCurrentEnum>(ScreenCurrentEnum.LOGIN);
  const actionSignUp = () => setAction(ScreenCurrentEnum.SIGN_UP);
  const actionForgotPassword = () => setAction(ScreenCurrentEnum.PASSWORD_RECOVERY);
  const actionLogin = () => setAction(ScreenCurrentEnum.LOGIN);

  /**
   * Get the reCaptcha token by refreshing it.
   *
   * @return {Promise<string>} The reCaptcha token.
   */
  const getReCaptchaToken = async (): Promise<string> => {
    try {
      const token = await reCaptchaRef.current?.refreshToken();
      return token;
    } catch (error) {
      throw new Error(ReCaptchaErrorsEnum.UNKNOWN_ERROR);
    }
  };

  /**
   * Invoke and manage the reCaptcha session token.
   *
   * @return {Promise<string>} The reCaptcha session token.
   */
  const invokeReCaptchaSessionToken = useCallback(async () => {
    if (!reCaptchaSessionToken) {
      try {
        const token = await getReCaptchaToken();
        if (token) {
          const request: IRecaptchaSessionRequest = {
            recaptchaToken: token,
            version: RecaptchaVersionEnum.V3,
            authFlow: action,
          };
          const reCaptchaToken = await authInteractor.executeRecaptchaSession(request);
          dispatch(setReCaptchaSessionToken(reCaptchaToken.token));
          return reCaptchaToken.token;
        }
        throw new Error(ReCaptchaErrorsEnum.UNKNOWN_ERROR);
      } catch (error: any) {
        const errorCode = getErrorCode(
          error?.response?.data?.code,
          ReCaptchaErrorsEnum,
          AuthErrorCodeEnum,
        );

        if (errorCode === ReCaptchaErrorsEnum.SECURITY_RISK) {
          navigation.navigate(AuthRoutesEnum.CHALLENGE, { action });
        } else {
          sessionModalError.showModalError(errorCode);
        }
        logCrashlytics({
          scope: 'API',
          fileName: 'providers/re-captcha-v3/ReCaptchaProvider',
          service: `invokeReCaptchaSessionToken - ${action}`,
          error,
        });
        throw Error(errorCode);
      }
    } else return reCaptchaSessionToken;
  }, [dispatch, reCaptchaSessionToken, sessionModalError]);

  /**
   * ReCaptcha context values.
   *
   * Use the `useMemo` hook to create an object containing functions and values
   * related to the ReCaptcha context.
   *
   * @type {Object}
   * @property {Function} invokeReCaptchaSessionToken - Function to invoke the reCaptcha session token.
   * @property {Function} actionSignUp - Function to change the current action to SIGNUP.
   * @property {Function} actionForgotPassword - Function to change the current action to PASSWORD_RECOVERY.
   * @property {Function} actionLogin - Function to change the current action to LOGIN.
   */
  const reCaptchaValues: any = useMemo(
    () => ({
      invokeReCaptchaSessionToken,
      actionSignUp,
      actionForgotPassword,
      actionLogin,
    }),
    [invokeReCaptchaSessionToken],
  );

  return (
    <ReCaptchaContext.Provider value={reCaptchaValues}>
      <ReCaptchaComponent
        ref={reCaptchaRef}
        action={action}
        captchaDomain={captchaDomain}
        siteKey={siteKey}
      />
      {children}
    </ReCaptchaContext.Provider>
  );
};
