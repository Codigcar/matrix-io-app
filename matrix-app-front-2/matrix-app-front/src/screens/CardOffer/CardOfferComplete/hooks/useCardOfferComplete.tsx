import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import * as RNLocalize from 'react-native-localize';
import { RememberDevice } from 'src/api/AuthServices';
import { setInactivityTimeout } from 'src/store/states/sessionStates';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { INACTIVITY_TIMEOUTS } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const useCardOfferComplete = (props: NavigationPropsType) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp30',
      seccion: 'Exito',
      tipoEvento: 'Visualizar',
      tipoElemento: 'Mensaje felicitaciones',
      valor: 'Felicidades',
    });
  }, []);

  const onPressContinue = () => {
    dispatch(setInactivityTimeout(INACTIVITY_TIMEOUTS.default));
    navigation.navigate(navigationScreenNames.physicalCard.stack, {
      screen: navigationScreenNames.physicalCard.introductionRequest,
    });
  };

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const getLocale = () => {
    const locales = RNLocalize.getLocales();
    if (locales.length > 0) {
      return locales[0].languageCode.toLowerCase();
    }
    return 'es';
  };
  useEffect(() => {
    const rememberDevice = async () => {
      await RememberDevice();
    };
    rememberDevice();
  }, []);

  return {
    onPressContinue,
    onPressBackArrow,
    getLocale,
  };
};

export default useCardOfferComplete;
