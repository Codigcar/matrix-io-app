import { useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { FormValues } from 'src/components/Form/form.props';
import { resetNavigation } from 'src/utils/navigationHandler';
import { ACTIVATE_CARD_POLLING, TIME_AWAIT_ACTIVATE_CARD } from 'src/utils/constants';
import useTimerToValidation from 'src/screens/KYC/ManualCheck/hooks/useTimerToValidation';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { i18n } from 'src/utils/core/MTXStrings';
import { useInterval } from 'usehooks-ts';
import { logCrashlytics } from 'src/utils/Analytics';
import { getStatusActivation, activateCard } from 'src/api/PhysicalCardServices';

const useActivateCard = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;

  const { startCountDown, isTimerActive } = useTimerToValidation(TIME_AWAIT_ACTIVATE_CARD);

  const activationStatusOk = 'COMPLETED';
  const activationStatusFailed = 'FAILED';
  const { orderId } = params;
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>('');
  const [interval, setInterval] = useState<boolean>(false);

  const hasSeparation = (position: number) => position === 4 || position === 9;

  const maskValue = (value: string): string =>
    value
      .replace(/ /g, '')
      .slice(0)
      .split('')
      .map((char, index) => {
        if (hasSeparation(index)) {
          return `${char} `;
        }
        return char;
      })
      .join('')
      .trim();
  const goTo = () => resetNavigation(navigation, navigationScreenNames.physicalCard.response);
  const goToGenericError = () =>
    navigation.navigate(navigationScreenNames.genericError, {
      title: i18n.t('activate-card-response.errorTitle'),
      subtitle: i18n.t('activate-card-response.errorSubtitle'),
      text: i18n.t('activate-card-response.errorDescription'),
      buttonLabel: i18n.t('activate-card-response.errorButtonLabel'),
    });
  const goBack = () => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);

  const getStatus = async (id: string) => {
    try {
      const response = await getStatusActivation(id);
      if (!isTimerActive() || response.status === activationStatusFailed) {
        setIsSuccess(false);
        setInterval(false);
        goToGenericError();
        setIsLoading(false);
      }
      if (response.status === activationStatusOk) {
        setInterval(false);
        setIsLoading(false);
        goTo();
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'RequestCard/ActivateCard/hooks/useActivateCard.tsx',
        service: 'getStatusActivation',
        error,
      });
      setIsSuccess(false);
      setInterval(false);
      goToGenericError();
      setIsLoading(false);
    }
  };

  useInterval(
    () => {
      getStatus(cardId);
    },
    interval ? ACTIVATE_CARD_POLLING : null,
  );

  const startPulling = (id: string) => {
    setCardId(id);
    setInterval(true);
    startCountDown();
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const { activationCode } = values;
    try {
      const dataActivation = {
        card: activationCode.replace(/\s/g, ''),
        deliveryOrderId: orderId,
      };
      const response = await activateCard(dataActivation);
      if (response.code) {
        setIsSuccess(false);
        setIsError(true);
        setIsLoading(false);
      } else {
        startPulling(response.id);
        setIsSuccess(true);
        setIsError(false);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'RequestCard/ActivateCard/hooks/useActivateCard.tsx',
        service: 'activateCard',
        error,
      });
      setIsSuccess(false);
      goToGenericError();
      setIsLoading(false);
    }
  };

  return {
    isError,
    isLoading,
    isSuccess,
    maskValue,
    goBack,
    onSubmit,
  };
};

export default useActivateCard;
