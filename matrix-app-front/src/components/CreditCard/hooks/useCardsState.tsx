import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import I2cCardServices from 'src/api/I2cCardServices';
import { setCards } from 'src/core/libraries-implementation/state-manager/states';
import { logCrashlytics } from 'src/utils/Analytics';

const useCardsState = () => {
  const [isLoadingCards, setIsLoadingCards] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setIsLoadingCards(true);
      try {
        const cardsResponse = await I2cCardServices.getCards();
        if (cardsResponse.length >= 1) {
          dispatch(setCards({ cards: cardsResponse }));
        }
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'CreditCard/hooks/useCardsState.tsx',
          service: ' I2cCardServices.getCards',
          error,
        });
      } finally {
        setIsLoadingCards(false);
      }
    };
    getData();
  }, []);

  return {
    isLoadingCards,
  };
};

export default useCardsState;
