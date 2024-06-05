import {
  NavigationProp, RouteProp, useNavigation, useRoute,
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IRecaptchaSessionRequest } from 'src/core/modules/auth/session/dtos/recaptcha-session/recaptcha-session-request.interface';
import { setReCaptchaSessionToken } from 'src/store/states/sessionStates';
import { AuthErrorCodeEnum, ReCaptchaErrorsEnum } from 'src/utils/enum/error-type.enum';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import Helpers from 'src/utils/Helpers';
import { RecaptchaVersionEnum } from 'src/core/modules/auth/session/enums/recaptcha-version.enum';
import useAuthInteractor from '../../interactors/auth.interactor';

export const useChallengePresenter = () => {
  const navigation = useNavigation<NavigationProp<ReactNavigation.AuthNavigator>>();
  const { params } = useRoute<RouteProp<ReactNavigation.AuthNavigator, 'Challenge'>>();
  const authInteractor = useAuthInteractor();
  const sessionModalError = useReCaptchaModalError();
  const dispatch = useDispatch();
  const { getErrorCode } = Helpers;

  const [isLoading, setIsLoading] = useState(true);
  const [errorRecaptchaSessionToken, setErrorRecaptchaSessionToken] = useState<any>();

  const goBack = () => navigation.goBack();

  const getRecaptchaSessionToken = async (recaptchaToken: string) => {
    try {
      const request: IRecaptchaSessionRequest = {
        recaptchaToken,
        version: RecaptchaVersionEnum.V2,
        authFlow: params.action,
      };
      const reCaptchaToken = await authInteractor.executeRecaptchaSession(request);
      dispatch(setReCaptchaSessionToken(null));
      dispatch(setReCaptchaSessionToken(reCaptchaToken.token));
      goBack();
    } catch (error: any) {
      setErrorRecaptchaSessionToken(error);
      const errorCode = getErrorCode(error?.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum);
      sessionModalError.showModalError(errorCode);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    isLoading,
    goBack,
    setIsLoading,
    errorRecaptchaSessionToken,
    getRecaptchaSessionToken,
  };
};

export default useChallengePresenter;
