import { NavigationPropsType } from 'src/types/types';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import CardCancellationServices from 'src/api/CardCancellationServices';
import { useSelector } from 'react-redux';
import CardConfigureServices from 'src/api/CardConfigureServices';
// Selectors
import { signInDataSelector } from 'src/utils/auth/selector/authSelector';
import { logCrashlytics } from 'src/utils/Analytics';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CommonActions } from '@react-navigation/native';
import { IHandles } from 'react-native-modalize/lib/options';
import { NO_SELECTION } from 'src/utils/constants';
import { Modalize } from 'react-native-modalize';
import { Dimensions } from 'react-native';
import { string } from '../../strings/string';

const useCancelAccountSurvey = (props: NavigationPropsType) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [reasons, setReasons] = useState([]);
  const [card, setCard] = useState('');
  const [accountId, setAccountId] = useState('');
  const [indexSelected, setIndexSelected] = useState<number>(NO_SELECTION);
  const [otherReason, setOtherReason] = useState<string>('');
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const modalizeRef = useRef<Modalize>(null);
  const { height } = Dimensions.get('window');
  const styleModal = { backgroundColor: '#151831CC' };
  const disabledButton = useMemo(
    () => indexSelected === NO_SELECTION || (indexSelected === 3 && !otherReason.trim().length),
    [indexSelected, otherReason],
  );
  const { getCardCancellationReasons, submitCardCancellation } = CardCancellationServices;

  const accessToken = useSelector(signInDataSelector);
  const reasonsDescriptions = [
    string.cancelAccountSurveyOption1,
    string.cancelAccountSurveyOption2,
    string.cancelAccountSurveyOption3,
    string.cancelAccountSurveyOption4,
  ];
  const goToGenericError = () =>
    navigation.navigate(navigationScreenNames.genericError, {
      nextScreen: navigationScreenNames.bottomTabNavigator,
      title: string.cancelAccountWaitingErrorTitle,
      subtitle: string.cancelAccountWaitingErrorSubtitle,
      text: string.cancelAccountWaitingErrorDescription,
      buttonLabel: string.cancelAccountWaitingErrorButtonLabel,
    });

  const getCardData = async () => {
    try {
      setIsLoading(true);
      const cardsResponse = await CardConfigureServices.getCards();
      const { length } = cardsResponse;

      if (length >= 1) {
        setCard(cardsResponse[0].id);
        setAccountId(cardsResponse[0].account);
      }

      setIsLoading(false);
    } catch (error) {
      goToGenericError();
      logCrashlytics({
        scope: 'API',
        fileName: 'CancelAccountSurvey/hooks/useCancelAccountSurvey.tsx',
        service: 'CardConfigureServices.getCards',
        error,
      });
    }
  };

  const getReasons = async () => {
    try {
      setIsLoading(true);
      const cancellationReasonsResponse = await getCardCancellationReasons(accessToken);
      setReasons(cancellationReasonsResponse);
    } catch (error) {
      goToGenericError();
      logCrashlytics({
        scope: 'API',
        fileName: 'CancelAccountSurvey/hooks/useCancelAccountSurvey.tsx',
        service: 'getCardCancellationReason',
        error,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCardData();
    getReasons();
  }, []);

  const onCancelAccount = async (indexSelected: number, otherReason: string) => {
    if (reasons[indexSelected]) {
      const reasonParam = {
        type: reasons[indexSelected],
        description: indexSelected === 3 ? otherReason : reasonsDescriptions[indexSelected],
      };
      const params = {
        cardId: card,
        reason: reasonParam,
      };

      try {
        setIsLoading(true);
        const submitCardCancellationResponse = await submitCardCancellation(accountId, params);
        const {
          requestTime, maskedCard, requestDate, pending,
        } = submitCardCancellationResponse;
        let pendingCreditBalance = 0;
        if (pending.type === 'overpayment') {
          pendingCreditBalance = pending.value;
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: navigationScreenNames.cancelAccountWaiting,
                params: {
                  requestTime,
                  maskedCard,
                  requestDate,
                  pendingCreditBalance,
                },
              },
            ],
          }),
        );
      } catch (error) {
        goToGenericError();
        logCrashlytics({
          scope: 'API',
          fileName: 'useCancelAccountSurvey.tsx',
          service: 'getCardCancellationRequest',
          error,
        });
        setIsLoading(false);
      }
    }
  };
  const onOpen = (ref: React.RefObject<IHandles>) => {
    ref.current?.open();
  };
  const onClose = (ref: React.RefObject<IHandles>) => {
    if (!isLoading) {
      ref.current?.close();
    }
  };
  const onPressBackArrow = () => {
    navigation.goBack();
  };
  return {
    onCancelAccount,
    onPressBackArrow,
    isLoading,
    reasonsDescriptions,
    onOpen,
    onClose,
    getCardData,
    getReasons,
    card,
    goToGenericError,
    reasons,
    setIsLoading,
    setReasons,
    indexSelected,
    setIndexSelected,
    otherReason,
    setOtherReason,
    isCheck,
    setIsCheck,
    modalizeRef,
    height,
    styleModal,
    disabledButton,
  };
};

export default useCancelAccountSurvey;
