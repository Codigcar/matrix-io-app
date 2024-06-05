import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext, useState } from 'react';
import { CardProps } from 'src/api/types/cardOperationsTypes';
import { saveValue, checkValue } from 'src/utils/AsyncStorageHandler';
import { CARD_IS_LOST, CARD_IS_OPEN } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import CardConfigureServices from 'src/api/CardConfigureServices';
import { logCrashlytics } from 'src/utils/Analytics';
import { NotificationContext } from 'src/shared/contexts';

export const useCardConfiguration = () => {
  const { updateCardTabBadge } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const navigation = useNavigation();

  const onPressCardConfigure = () => {
    navigation.navigate(navigationScreenNames.settingsStack);
  };

  useFocusEffect(
    useCallback(() => {
      const getCard = async () => {
        setIsLoading(true);
        try {
          const cardsResponse = await CardConfigureServices.getCards();
          const { length } = cardsResponse;
          if (length >= 1) {
            setStatus(cardsResponse[0].status === CARD_IS_OPEN);
            const cardLost = cardsResponse.filter(
              (item: CardProps) => item.status === CARD_IS_LOST,
            );
            if (cardLost.length >= 1) {
              const hasNotified = await checkValue('cardBadgeNotified');
              if (!hasNotified) {
                updateCardTabBadge(true);
                await saveValue('cardBadgeNotified', true);
              }
            }
          }
        } catch (error) {
          logCrashlytics({
            scope: 'API',
            fileName: 'Home/components/hooks/useCardConfiguration.tsx',
            service: 'CardConfigureServices.getCards',
            error,
          });
        } finally {
          setIsLoading(false);
        }
      };
      getCard();
    }, []),
  );

  return {
    isLoading,
    status,
    onPressCardConfigure,
  };
};
