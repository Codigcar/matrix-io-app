import { deleteContactData } from 'src/api/Onboarding';
import { logCrashlytics } from 'src/utils/Analytics';
import { useState } from 'react';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { i18n } from 'src/utils/core/MTXStrings';
import { DOCUMENTS_BASE_URL } from 'src/utils/constants';
import { resetNavigation } from 'src/utils/navigationHandler';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';

const useOfferUnavailablePresenter = (props: CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.OFFER_UNAVAILABLE>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>) => {
  const { navigation, route: { params } } = props;
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleCheck = () => setIsChecked(!isChecked);

  const onPressLink = () => {
    navigation.navigate(navigationScreenNames.documentDetail, {
      title: i18n.t('enrollment-document-detail-policy') ?? '',
      url: `${DOCUMENTS_BASE_URL}perdatcla1.pdf`,
    });
  };

  const onPressContinue = () => {
    if (isChecked) {
      try {
        deleteContactData(params.token);
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'Enrollment/GetData/OfferUnavailable/hooks/useGetEmailDni.tsx',
          service: 'deleteContactData',
          error,
        });
      }
    }
    resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
  };

  return {
    onPressContinue,
    onPressLink,
    handleCheck,
    isChecked,
  };
};

export default useOfferUnavailablePresenter;
