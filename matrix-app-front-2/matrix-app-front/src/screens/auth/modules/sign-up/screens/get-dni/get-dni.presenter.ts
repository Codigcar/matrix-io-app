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

const useGetDniPresenter = (props: CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.GET_DNI>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>) => {
  const { navigation } = props;

  const onPressContinue = (data: any) => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp02',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Continuar',
    });
    const { dni: documentNumber } = data;
    navigation.navigate(SignUpRoutesEnum.GET_EMAIL, {
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

export default useGetDniPresenter;
