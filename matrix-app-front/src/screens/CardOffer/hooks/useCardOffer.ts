import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import { signInCardOfferSelector } from 'src/utils/auth/selector/authSelector';
import cardOfferServices from 'src/api/CardOfferServices';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, logVirtualEventAnalytics, setAnalyticRoute } from 'src/utils/Analytics';
import { onboardingStates } from 'src/utils/eventsHandler/eventList';
import { OFFER_CONTRACT_INTERVAL_TIME, OFFER_CONTRACT_TIME_AWAIT } from 'src/utils/constants';
import { useInterval } from 'usehooks-ts';
import { onboardingSummary } from 'src/api/Onboarding';
import waitResponsePolling from 'src/utils/polling';
import { IOffer } from '../shared/interfaces';

const WAIT_ONBOARDING_MFA = 60000;
const WAIT_ONBOARDING_MFA_INTERVAL = 1000;

const nameDataSelector = (state: any) => state.session.user?.name;
const ALREADY_WITH_OFFER = 'ALREADY_WITH_OFFER';
export class AlreadyWithOffer extends Error {
  constructor() {
    super(ALREADY_WITH_OFFER);
    this.name = ALREADY_WITH_OFFER;
  }
}

export const useCardOffer = (props: NavigationPropsType) => {
  const [offer, setOffer] = useState<IOffer>();
  const [loading, setLoading] = useState<{
    type?: string;
    visible?: boolean;
  }>({
    type: 'loadingOffer',
    visible: true,
  });
  const [summarySheet, setSummarySheet] = useState('');
  const { navigation } = props;
  const { getUserOffers, submitContract, getSummarySheet } = cardOfferServices;
  const name = useSelector(nameDataSelector);
  const [countError, setCountError] = useState(0);
  const [interval, setInterval] = useState<boolean>(false);

  const cardOffer = useSelector(signInCardOfferSelector);

  useEffect(() => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp27',
      tipoZona: 'OfertaTC',
      zona: 'CrearOferta',
      subZona: '(not available)',
      seccion: 'Exito',
      tipoElemento: 'Pantalla',
      tipoEvento: 'Visualizar',
      valor: 'Domicilio-Exito',
    });
  }, []);

  useEffect(() => {
    if (loading.type === 'warning') {
      logVirtualEventAnalytics({
        screenName: 'ModalOfferError',
        section: 'Warning',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'No hemos podido procesar tu solicitud en este momento',
      });
    } else if (loading.type === 'error') {
      logVirtualEventAnalytics({
        screenName: 'ModalOfferError2',
        section: 'Error',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'No hemos podido procesar tu solicitud en este momento',
      });
    } else if (loading.type === 'loadingOffer') {
      logVirtualEventAnalytics({
        screenName: 'ModalOfferLoading',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'Estamos creando la mejor oferta para ti',
      });
    } else {
      logVirtualEventAnalytics({
        screenName: 'ModalOfferValidationLoading',
        tipoEvento: 'Visualizar',
        tipoElemento: 'Pantalla',
        valor: 'Estamos procesando tu solicitud',
      });
    }
  }, [loading.type]);

  const showError = () => {
    if (countError === 0) {
      setCountError(countError + 1);
      setLoading({
        type: 'warning',
      });
    } else {
      setLoading({
        type: 'error',
      });
      setCountError(0);
    }
  };

  const getState = async () => {
    const response = await onboardingSummary();
    if (response.status) {
      const { status } = response;
      if (status === onboardingStates.onboardingCompleted) {
        logVirtualEventAnalytics({
          eventName: 'virtualEventApp28',
          seccion: 'Exito',
          tipoEvento: 'Click',
          tipoElemento: 'Boton',
          valor: '¡Quiero esta tarjeta!',
        });
        setInterval(false);
        setLoading({
          visible: false,
        });
        navigation.navigate(navigationScreenNames.cardOfferComplete);
      }
      if (status === onboardingStates.contractFailed) {
        setInterval(false);
        showError();
      }
    }
  };

  useInterval(() => getState(), interval ? OFFER_CONTRACT_INTERVAL_TIME : null);
  useInterval(
    () => {
      setInterval(false);
      showError();
    },
    interval ? OFFER_CONTRACT_TIME_AWAIT : null,
  );

  const submitCardContract = async (
    offerId: string,
    acceptDataProtect: boolean,
    amount: number,
  ) => {
    const onboardingStatus = await waitResponsePolling(
      WAIT_ONBOARDING_MFA,
      WAIT_ONBOARDING_MFA_INTERVAL,
      () => onboardingSummary(),
      ({ status }) => status === onboardingStates.onboardingCompleted
        || status === onboardingStates.mfaRegistered,
    );
    if (onboardingStatus.status === onboardingStates.onboardingCompleted) {
      logVirtualEventAnalytics({
        eventName: 'virtualEventApp28',
        seccion: 'Exito',
        tipoEvento: 'Click',
        tipoElemento: 'Boton',
        valor: '¡Quiero esta tarjeta!',
      });
      setLoading({
        visible: false,
      });
      throw new AlreadyWithOffer();
    }
    try {
      await submitContract(offerId, {
        acceptDataProtection: acceptDataProtect,
        amountOfCredit: amount,
        v: 2,
      });
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CardOffer/hooks/useCardOffer.ts',
        service: 'submitContract',
        error,
      });
      showError();
      throw error;
    }
  };

  const startPolling = () => {
    setInterval(true);
  };

  const getResume = async (creditLine: number) => {
    try {
      const data = await getSummarySheet(creditLine);
      if (data.preSignedUrl) {
        setSummarySheet(data.preSignedUrl);
      }
    } catch (error) {
      console.log('error => getSummarySheet', error);
      showError();
      logCrashlytics({
        scope: 'API',
        fileName: 'CardOffer/hooks/useCardOffer.ts',
        service: 'getSummarySheet',
        error,
      });
    }

    setLoading({ visible: false });
  };

  useEffect(() => {
    const listProductsOffers = async () => {
      try {
        const data = await getUserOffers();
        if (data.length) {
          setOffer(data[0]);
        } else {
          navigation.navigate(navigationScreenNames.noCardOffer);
        }
      } catch (error) {
        navigation.navigate(navigationScreenNames.noCardOffer);
        logCrashlytics({
          scope: 'API',
          fileName: 'CardOffer/hooks/useCardOffer.ts',
          service: 'getUserOffers',
          error,
        });
      }
    };

    const retrieveOffer = async () => {
      setOffer(cardOffer);
    };

    if (cardOffer) {
      retrieveOffer();
    } else {
      listProductsOffers();
    }
  }, [cardOffer, getUserOffers, navigation]);

  useEffect(() => {
    if (!offer) return;
    getResume(offer.maxCreditLine);
  }, [offer]);

  return {
    offer,
    loading,
    setLoading,
    submitCardContract,
    startPolling,
    name,
    summarySheet,
    getState,
  };
};

export default useCardOffer;
