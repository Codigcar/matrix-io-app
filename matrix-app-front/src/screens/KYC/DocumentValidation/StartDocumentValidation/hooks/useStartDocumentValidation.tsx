import { NavigationPropsType } from 'src/types/types';
import { setInactivityTimeout } from 'src/core/libraries-implementation/state-manager/states';
import { useDispatch } from 'react-redux';
import { INACTIVITY_TIMEOUTS } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { analyticsManagerProvider, AnalyticsProviderType, GoogleLoggerEvents } from 'src/shared/providers/analytics/index';

const useStartDocumentValidation = (props: NavigationPropsType) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const handlePressButton = async () => {
    analyticsManagerProvider.logEventWithType(
      {
        seccion: 'Exito',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Mensaje felicitaciones',
        valor: 'Felicidades',
      },
      AnalyticsProviderType.firebase,
      GoogleLoggerEvents.onPressEnrollment,
    );
    dispatch(setInactivityTimeout(INACTIVITY_TIMEOUTS.onboarding));
    navigation.navigate(navigationScreenNames.introductionDocumentScan);
  };

  return {
    handlePressButton,
  };
};

export default useStartDocumentValidation;
