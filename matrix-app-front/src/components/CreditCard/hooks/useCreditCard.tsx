import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import I2cCardServices from 'src/api/I2cCardServices';
import { logCrashlytics } from 'src/utils/Analytics';
import { useFocusEffect } from '@react-navigation/native';
import { CARD_IS_OPEN } from 'src/utils/constants';

const useCreditCard = () => {
  const [cardReferences, setCardReferences] = useState({
    authToken: '',
    cardRefNo: '',
    idCard: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrorI2C, setHasErrorI2C] = useState(false);
  const timerToFinishTask = 1 * 60000; // This value must be get from Remote Config (in seconds);

  const statusCard = useSelector((state: any) => state.cards?.statusCard);
  const cardsStore = useSelector((state: any) => state.cards?.cards);
  const isCardEnable: boolean = statusCard === CARD_IS_OPEN;

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        setIsLoading(true);
        setHasErrorI2C(false);
        try {
          if (cardsStore.length >= 1) {
            if (cardsStore[0].status === CARD_IS_OPEN) {
              const { reference, id } = cardsStore[0];
              const signResponse = await I2cCardServices.getCardSignature(id);
              const { signOnToken: token } = signResponse;
              setCardReferences({ authToken: token, cardRefNo: reference, idCard: id });
            }
          }
        } catch (error) {
          setCardReferences({ authToken: '', cardRefNo: '', idCard: '' });
          logCrashlytics({
            scope: 'API',
            fileName: 'CreditCard/hooks/useCreditCard.tsx',
            service: ' I2cCardServices.getCards',
            error,
          });
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }, [cardsStore]),
  );
  return {
    cardReferences,
    isLoading,
    timerToFinishTask,
    isCardEnable,
    setHasErrorI2C,
    hasErrorI2C,
  };
};

export default useCreditCard;
