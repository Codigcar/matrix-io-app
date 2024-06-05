import { useEffect } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { BackHandler } from 'react-native';
import { resetNavigation } from 'src/utils/navigationHandler';
import { AuthErrorCodeEnum } from 'src/utils/enum/error-type.enum';
import { useRoute } from '@react-navigation/native';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

const useRecoverFullPasswordPresenter = (props: NavigationPropsType) => {
  const route: any = useRoute();

  const responseKeys: any = {
    title: {
      default: 'session-error.server.title',
      ok: 'recoveryPassword-passwordResponse-title',
      invalidOtp: 'recoveryPassword-passwordResponse-fail-title',
      attemptsExceeded: 'recoveryPassword-passwordResponse-attempts-exceeded-title',
    },
    message: {
      default: 'session-error.server.message',
      ok: 'recoveryPassword-passwordResponse-message',
      invalidOtp: 'recoveryPassword-passwordResponse-otp-content',
      attemptsExceeded: 'recoveryPassword-passwordResponse-attempts-exceeded-content',
    },
    description: {
      invalidOtp: 'recoveryPassword-passwordResponse-fail-description',
      attemptsExceeded: 'recoveryPassword-passwordResponse-attempts-exceeded-info',
    },
    buttonLabel: {
      default: 'session-error.server.submit',
      invalidOtp: 'recoveryPassword-passwordResponse-failFirstButton-label',
      attemptsExceeded: 'recoveryPassword-passwordResponse-finish',
    },
  };

  const getResponseKey = (type: string) => {
    if (route.params?.isOkResponse && responseKeys[type].ok) {
      return responseKeys[type].ok;
    }
    if (route.params?.code === AuthErrorCodeEnum.INVALID_OTP && responseKeys[type].invalidOtp) {
      return responseKeys[type].invalidOtp;
    }
    if (
      route.params?.code === AuthErrorCodeEnum.ATTEMPTS_EXCEEDED
      && responseKeys[type].attemptsExceeded
    ) {
      return responseKeys[type].attemptsExceeded;
    }
    return responseKeys[type].default;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  const onGoToLoginPress = () => resetNavigation(props.navigation, AuthRoutesEnum.AUTH_STACK);

  const onRetryPress = () => {
    if (props?.route?.params?.code === AuthErrorCodeEnum.INVALID_OTP) {
      props.navigation.navigate(AuthRoutesEnum.PASSWORD_RECOVERY_STACK, {
        screen: AuthRoutesEnum.VALIDATE_DNI,
      });
    } else {
      onGoToLoginPress();
    }
  };

  return {
    onRetryPress,
    onGoToLoginPress,
    getResponseKey,
  };
};

export default useRecoverFullPasswordPresenter;
