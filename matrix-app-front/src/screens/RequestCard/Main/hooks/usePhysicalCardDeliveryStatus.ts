import { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { getLastStatusDelivery } from 'src/api/PhysicalCardServices';
import { logCrashlytics } from 'src/utils/Analytics';
import { OrderStatusProps } from 'src/api/types/requestPhysicalCardTypes';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { useSelector } from 'react-redux';
import { CARD_IS_STOLEN, STATUS_DELIVERY_ORDER } from 'src/utils/constants';

const usePhysicalCardDeliveryStatus = (props: NavigationPropsType) => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasProduct, setHasProduct] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const [deliveryData, setDeliveryData] = useState<OrderStatusProps | null>(null);
  const physicalCardState = useSelector((state: any) => state.cards?.statusPhysicalCard);

  useEffect(() => {
    const getStatus = async () => {
      try {
        setIsLoading(true);
        const response = await getLastStatusDelivery();
        if (response.length) {
          if (response[0].status === STATUS_DELIVERY_ORDER.pendingActivation) {
            setDeliveryData(response[0]);
            setHasProduct(true);
          }
          if (response[0].status === STATUS_DELIVERY_ORDER.orderClosed) {
            if (physicalCardState !== CARD_IS_STOLEN) {
              setIsClosed(true);
            }
          }
        }
      } catch (error) {
        setIsLoading(false);
        logCrashlytics({
          scope: 'API',
          fileName: 'RequestCard/Main/hooks/usePhysicalCardDeliveryStatus.ts',
          service: 'getLastStatusDelivery',
          error,
        });
        navigation.navigate(navigationScreenNames.genericError, {
          nextScreen: navigationScreenNames.bottomTabNavigator,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getStatus();
  }, [navigation, physicalCardState]);

  const goToRequestPhysicalCard = () =>
    navigation.navigate(navigationScreenNames.physicalCard.stack);

  return {
    isLoading,
    isClosed,
    hasProduct,
    navigation,
    deliveryData,
    goToRequestPhysicalCard,
  };
};

export default usePhysicalCardDeliveryStatus;
