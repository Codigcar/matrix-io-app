import { useState, useRef, useContext } from 'react';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import { NEW_PASSWORD_REQUIREMENTS } from 'src/utils/constants';
import { logCrashlytics } from 'src/utils/Analytics';
import { TextInput } from 'react-native';
import { FormikHelpers } from 'formik';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import getDeviceMetadata from 'src/utils/metadataClient';
import { cryptPwd } from 'src/utils/CryptoDataHandler';
import IConfirmPasswordRequest from 'src/core/modules/auth/password/dtos/confirm-password/confirm-password-request.interface';
import RoutesEnum from 'src/shared/enums/routes/routes.enum';
import {
  AuthErrorCodeEnum,
  ReCaptchaErrorsEnum,
  ScreenCurrentEnum,
} from 'src/utils/enum/error-type.enum';
import Helpers from 'src/utils/Helpers';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useNewPasswordInteractor from './new-password.interactor';

const hasNumber = (value: string): boolean => {
  if (value && value.match(/[0-9]/)) {
    return true;
  }
  return false;
};

const has8CharactersAlphanumerics = (value: string) => !!value && value.length >= 8;

const hasUppercase = (value: string): boolean => {
  if (value && value.match(/[A-Z]/)) {
    return true;
  }
  return false;
};

const hasSpecialCharacter = (value: string): boolean => {
  if (
    value
    && value.match(/.*([@$#%.()~!^&*_+=`|\\{}[\]:;"'<>,?/-])/)
    && !value.match(/.*([^0-9a-zA-Z@$#%.()~!^&*_+=`|\\{}[\]:;"'<>,?/-])/)
  ) {
    return true;
  }
  return false;
};

const validationState = {
  'validation-min-8': has8CharactersAlphanumerics,
  'validation-uppercase': hasUppercase,
  'validation-number': hasNumber,
  'validation-special-chars': hasSpecialCharacter,
};

const useNewPasswordPresenter = (props: CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.PasswordRecoveryNavigator, 'NewPassword'>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { code, documentNumber } = params;
  const newPasswordInteractor = useNewPasswordInteractor();
  const [feedbackIsVisible, setFeedbackIsVisible] = useState<boolean>(false);
  const ReCaptcha = useContext(ReCaptchaContext);
  const { getErrorCode } = Helpers;
  const sessionModalError = useReCaptchaModalError();

  const handleErrorConfirmPassword = (error: any) => {
    logCrashlytics({
      scope: 'API',
      fileName: 'auth/recover-password/screens/new-password.presenter.tsx',
      service: 'executeConfirmPassword',
      error,
    });
    if (error.code === ReCaptchaErrorsEnum.SESSION_EXPIRED) {
      sessionModalError.showModalError(error.code, ScreenCurrentEnum.PASSWORD_RECOVERY);
    } else {
      navigation.navigate(RoutesEnum.RECOVER_FULL_PASSWORD, {
        isOkResponse: false,
        code: getErrorCode(error?.code, ReCaptchaErrorsEnum, AuthErrorCodeEnum),
      });
    }
  };

  const repeatRef = useRef<TextInput>(null);

  const onPressContinue = async (
    { password }: { password: string },
    helpers: FormikHelpers<{ password: string; passwordConfirmation: string }>,
  ) => {
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      helpers.setSubmitting(true);
      const userId = await changeUserForId(documentNumber);
      const device = await getDeviceMetadata();
      const passwordCrypt = await cryptPwd(password);
      try {
        const data: IConfirmPasswordRequest = {
          username: userId || documentNumber,
          password: passwordCrypt,
          session: recaptchaToken,
          code,
          device,
        };
        await newPasswordInteractor.executeConfirmPassword(data);
        navigation.navigate(RoutesEnum.RECOVER_FULL_PASSWORD, { isOkResponse: true });
      } catch (error: any) {
        handleErrorConfirmPassword(error);
      } finally {
        helpers.resetForm();
        helpers.setSubmitting(false);
      }
    } else {
      helpers.resetForm();
      helpers.setSubmitting(false);
    }
  };

  const checkOptions: (
    opt: (typeof NEW_PASSWORD_REQUIREMENTS)[number],
    value: string,
  ) => boolean = (opt, value) => validationState[opt]?.(value) ?? false;

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return {
    checkOptions,
    onPressContinue,
    onPressBackArrow,
    feedbackIsVisible,
    repeatRef,
    setFeedbackIsVisible,
  };
};

export default useNewPasswordPresenter;
