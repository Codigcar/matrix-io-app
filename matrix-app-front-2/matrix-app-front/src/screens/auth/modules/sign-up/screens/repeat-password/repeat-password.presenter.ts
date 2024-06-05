import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const useRepeatPasswordPresenter = (
  props: CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.PASSWORD_REPEAT>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >,
) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { email, documentNumber, password } = params;

  const onPressContinue = () => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp04',
      seccion: 'HaceMatch',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Continuar',
    });
    navigation.navigate(SignUpRoutesEnum.GET_PHONE, { email, documentNumber, password });
  };
  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return {
    password,
    onPressContinue,
    onPressBackArrow,
  };
};

export default useRepeatPasswordPresenter;
