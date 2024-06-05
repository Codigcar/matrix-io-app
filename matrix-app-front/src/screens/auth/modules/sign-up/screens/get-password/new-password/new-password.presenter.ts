import { NEW_PASSWORD_REQUIREMENTS } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const has8CharactersAlphanumerics = (value: string) => !!value && value.length >= 8;

const hasUppercase = (value: string): boolean => {
  if (value && value.match(/[A-Z]/)) {
    return true;
  }
  return false;
};

const hasNumber = (value: string): boolean => {
  if (value && value.match(/[0-9]/)) {
    return true;
  }
  return false;
};

const hasSpecialCharacter = (value: string): boolean => {
  if (
    value
    && value.match(/.*([@$#%.()~!^&*_+=`|\\{}[\]:;"'<>,?/-])/)
    && !value.match(/.*([^0-9ña-zÑA-Z@$#%.()~!^&*_+=`|\\{}[\]:;"'<>,?/-])/)
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

export const usePasswordPresenter = (
  props: CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, 'PasswordVerification'>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >,
) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { email, documentNumber } = params;

  const onPressContinue = ({ password }: { password: string }) => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp03',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Continuar',
    });
    navigation.navigate(navigationScreenNames.passwordRepeat, { email, documentNumber, password });
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
  };
};

export default usePasswordPresenter;
