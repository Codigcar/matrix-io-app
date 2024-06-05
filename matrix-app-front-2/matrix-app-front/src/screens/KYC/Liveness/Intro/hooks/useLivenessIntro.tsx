import { useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useDispatch } from 'react-redux';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { getSteps } from 'src/api/Onboarding';
import cardOfferServices from 'src/api/CardOfferServices';
import { setCardOffer } from 'src/utils/auth/states/signInStates';
import { onboarding } from 'src/utils/constants';

const useLivenessIntro = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const {
    signedUrl, instructions, session, validationId, process,
  } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isOnboarding = process === onboarding;

  const { getUserOffers } = cardOfferServices;

  const getCardOfferAndStore = async () => {
    try {
      const data = await getUserOffers();
      if (data.length >= 1) {
        dispatch(setCardOffer(data[0]));
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'KYC/Liveness/Intro/hooks/useLivenessIntro.tsx',
        service: 'cardOfferServices.getUserOffers',
        error,
      });
    }
  };

  const getStepsOnboarding = async () => {
    const response = await getSteps();
    const { message } = response;
    navigation.navigate(navigationScreenNames.livenessFaceScan, {
      livenessFileUploadLink: message.signed_url,
      livenessInstructions: message.instruction?.instructions?.actions,
    });
  };

  const goToPassiveLiveness = () => {
    if (signedUrl && instructions) {
      navigation.navigate(navigationScreenNames.enrollmentDevice.scan, {
        livenessFileUploadLink: signedUrl,
        livenessInstructions: instructions,
        process,
        session,
        validationId,
      });
    } else {
      throw new Error('does not have signetUrl');
    }
  };

  const onPressContinue = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      if (isOnboarding) {
        logVirtualEventAnalytics({
          eventName: 'virtualEventApp13',
          screenName: navigationScreenNames.livenessIntro,
          tipoEvento: 'Click',
          tipoElemento: 'Boton',
          valor: 'Continuar',
        });
        await getCardOfferAndStore();
        await getStepsOnboarding();
      } else {
        goToPassiveLiveness();
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: `KYC/Liveness/Intro/hooks/useLivenessIntro.tsx${process}`,
        service: 'startLiveness',
        error,
      });
      navigation.navigate(navigationScreenNames.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onPressContinue,
    isLoading,
    isOnboarding,
  };
};

export default useLivenessIntro;
