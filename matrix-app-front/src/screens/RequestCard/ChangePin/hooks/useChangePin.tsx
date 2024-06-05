import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import I2cCardServices from 'src/api/I2cCardServices';
import { logCrashlytics } from 'src/utils/Analytics';
import { useIsFocused } from '@react-navigation/native';
import { setCards } from 'src/core/libraries-implementation/state-manager/states';
import { CARD_IS_INACTIVE, CARD_IS_STOLEN, INACTIVITY_TIMEOUTS, android, ios } from 'src/utils/constants';
import { useNetInfo } from '@react-native-community/netinfo';
import I2CModule from 'src/components/I2cSdk/I2CModule';
import { resetNavigationToScreen } from 'src/utils/navigationHandler';
import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import checkActivityApp from 'src/utils/auth/session/checkActivityApp';

const useChangePin = (props: NavigationPropsType) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { isConnected } = useNetInfo();
  const {
    i2cEvents,
    changePinPhysicalCard,
    finishTask,
    finishTaskTimeOut,
    cleanAndroidInterval,
    cleanIOsInterval,
  } = I2CModule;

  const [cardPhysicalReferencesId, setPhysicalCardReferencesId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [i2cErrorModal, setI2cErrorModal] = useState<boolean>(false);
  const [i2cHasErrorDisabled, setI2cHasErrorDisabled] = useState<boolean>(false);
  const [inactivePhysicalCardModal, setInactivePhysicalCardModal] = useState<boolean>(false);
  const [forgotPinVisible, setForgotPinVisible] = useState<boolean>(false);
  const [successCount, setSuccessCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const timeToCloseModal = (INACTIVITY_TIMEOUTS.default - 10) * 1000;

  const cardsStore = useSelector((state: any) => state.cards?.cards);
  const statusPhysicalCard = useSelector((state: any) => state.cards?.statusPhysicalCard);
  const isCardInactive: boolean = statusPhysicalCard === CARD_IS_INACTIVE;

  useEffect(() => {
    if (isFocused) {
      i2cEvents.addListener('onError', (log: { errorCode: string; errorDescription: string }) => {
        if (log.errorCode !== '-999') {
          logCrashlytics({
            scope: 'SDK',
            fileName: 'ChangePin/useChangePin.tsx',
            sdk: 'I2C',
            error: `${log.errorCode} ${log.errorDescription}`,
            extraData: {
              networkStatus: isConnected ? 'active' : 'inactive',
              idTdc: cardPhysicalReferencesId,
            },
          });
          if (successCount <= 1) {
            if (!android) finishTask();
            setI2cErrorModal(true);
          } else if (!i2cHasErrorDisabled) {
            finishTask();
            resetNavigationToScreen(navigation, [
              navigationScreenNames.physicalCard.stack,
              navigationScreenNames.physicalCard.changePinError,
            ]);
          }
          setI2cHasErrorDisabled(true);
        }
      });

      i2cEvents.addListener('onSuccessTaskChange', () => {
        finishTask();
        resetNavigationToScreen(navigation, [
          navigationScreenNames.physicalCard.stack,
          navigationScreenNames.physicalCard.changePinResponse,
        ]);
      });

      i2cEvents.addListener('onSuccess', () => {
        if (ios) finishTaskTimeOut(timeToCloseModal);
        setIsModalOpen(true);
        setSuccessCount(successCount + 1);
      });

      i2cEvents.addListener('onClosed', () => {
        setIsModalOpen(false);
        cleanIOsInterval();
      });

      i2cEvents.addListener('onLoading', () => {
        checkActivityApp();
        if (isModalOpen) {
          if (!ios) {
            cleanAndroidInterval();
            finishTaskTimeOut(timeToCloseModal);
          }
        }
      });
    }
    return () => {
      i2cEvents.removeAllListeners('onSuccess');
      i2cEvents.removeAllListeners('onError');
      i2cEvents.removeAllListeners('onSuccessTaskChange');
      i2cEvents.removeAllListeners('onLoading');
      i2cEvents.removeAllListeners('onClosed');
    };
  }, [cardPhysicalReferencesId, i2cErrorModal, isFocused, successCount]);

  useEffect(() => {
    if (isFocused) setI2cHasErrorDisabled(false);
  }, [isFocused]);

  const goToGenericError = () =>
    navigation.navigate(navigationScreenNames.genericError, {
      nextScreen: navigationScreenNames.bottomTabNavigator,
    });

  const changePin = async () => {
    setSuccessCount(0);
    setIsLoading(true);
    try {
      if (cardsStore[1] && cardsStore[1].status !== CARD_IS_STOLEN) {
        if (isCardInactive) {
          setIsLoading(false);
          setInactivePhysicalCardModal(true);
        } else {
          const { reference, id } = cardsStore[1];
          const signResponse = await I2cCardServices.getCardSignature(id);
          const { signOnToken: token } = signResponse;
          setPhysicalCardReferencesId(id);
          setIsLoading(false);
          changePinPhysicalCard(token, reference);
        }
      } else {
        const cardsResponse = await I2cCardServices.getCards();
        if (cardsResponse.length >= 1) {
          dispatch(setCards({ cards: cardsResponse }));
          if (cardsResponse[1].status !== CARD_IS_INACTIVE) {
            const { reference, id } = cardsResponse[1];
            const signResponse = await I2cCardServices.getCardSignature(id);
            const { signOnToken: token } = signResponse;
            setPhysicalCardReferencesId(id);
            setIsLoading(false);
            changePinPhysicalCard(token, reference);
          } else {
            setIsLoading(false);
            setInactivePhysicalCardModal(true);
          }
        } else setIsLoading(false);
      }
    } catch (error) {
      setPhysicalCardReferencesId('');
      setIsLoading(false);
      logCrashlytics({
        scope: 'API',
        fileName: 'ChangePin/hooks/useChangePin.tsx',
        service: ' I2cCardServices.getCards',
        error,
      });
      goToGenericError();
    }
  };
  return {
    isLoading,
    changePin,
    i2cErrorModal,
    setI2cErrorModal,
    inactivePhysicalCardModal,
    setInactivePhysicalCardModal,
    forgotPinVisible,
    setForgotPinVisible,
    i2cHasErrorDisabled,
  };
};

export default useChangePin;
