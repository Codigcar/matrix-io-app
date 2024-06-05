import { i18n } from 'src/utils/core/MTXStrings';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';

const documents = {
  terms: {
    title: i18n.t('enrollment-document-detail-terms-and-conditions'),
    url: `${DOCUMENTS_BASE_URL}perdatcla1.pdf`,
  },
  privacy: {
    title: i18n.t('enrollment-document-detail-policy'),
    url: `${DOCUMENTS_BASE_URL}perdatcla1.pdf`,
  },
};

const useGetEmailPresenter = (props: CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.GET_EMAIL>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>) => {
  const { navigation, route } = props;

  const onPressContinue = (data: {email: string}) => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp02',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Continuar',
    });
    const { documentNumber } = route.params;
    const { email } = data;
    navigation.navigate(SignUpRoutesEnum.PASSWORD_VERIFICATION, {
      email,
      documentNumber,
    });
  };

  const onPressBackArrow = () => navigation.goBack();

  const onLinkPress = (type: keyof typeof documents) => {
    navigation.navigate(navigationScreenNames.documentDetail, documents[type]);
  };

  return {
    onPressContinue,
    onPressBackArrow,
    onLinkPress,
  };
};

export default useGetEmailPresenter;
