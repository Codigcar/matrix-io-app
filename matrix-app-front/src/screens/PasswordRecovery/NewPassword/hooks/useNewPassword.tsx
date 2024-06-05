import { useState, useRef, useContext } from 'react';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import { NEW_PASSWORD_REQUIREMENTS } from 'src/utils/constants';
import { NavigationPropsType } from 'src/types/types';
import { ConfirmPassword } from 'src/api/AuthServices';
import { logCrashlytics } from 'src/utils/Analytics';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { TextInput } from 'react-native';
import { FormikHelpers } from 'formik';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';
import getDeviceMetadata from 'src/utils/metadataClient';
import { cryptPwd } from 'src/utils/CryptoDataHandler';

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

export const useNewPassword = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { code, documentNumber } = params;
  const [feedbackIsVisible, setFeedbackIsVisible] = useState<boolean>(false);
  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();

  const repeatRef = useRef<TextInput>(null);

  const onPressContinue = async (
    { password }: { password: string },
    helpers: FormikHelpers<{ password: string; passwordConfirmation: string }>,
  ) => {
    helpers.setSubmitting(true);
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      try {
        const userId = await changeUserForId(documentNumber);
        const device = await getDeviceMetadata();
        const passwordCrypt = await cryptPwd(password);
        const username = userId || documentNumber;
        await ConfirmPassword(username, passwordCrypt, code, { session: recaptchaToken, device });
        navigation.navigate(navigationScreenNames.recoveryPassword.response, {
          isOkResponse: true,
        });
      } catch (error: any) {
        if (error?.code) {
          sessionModalError.showModalError(error?.code, ScreenCurrentEnum.PASSWORD_RECOVERY);
        } else {
          logCrashlytics({
            scope: 'API',
            fileName: 'PasswordRecovery/NewPassword/hooks/useNewPassword.tsx',
            service: 'ConfirmPassword',
            error,
          });
          navigation.navigate(navigationScreenNames.recoveryPassword.response, {
            isOkResponse: false,
          });
        }
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

export default useNewPassword;
