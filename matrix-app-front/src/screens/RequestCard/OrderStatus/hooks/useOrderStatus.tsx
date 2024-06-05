import { useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderStatusType } from 'src/types/types';
import { CARD_IS_OPEN } from 'src/utils/constants';
import { resetNavigationToScreen } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const nameDataSelector = (state: any) => state.session.user?.fullName;

const useOrderStatus = (props: OrderStatusType) => {
  const { navigation, deliveryData } = props;

  const name = useSelector(nameDataSelector);

  const date = deliveryData?.deliveryDate;
  const address = deliveryData?.location.address;
  const addressLabel = `${deliveryData?.location.deparment}, ${deliveryData?.location.province},  ${deliveryData?.location.district}`;
  const phoneNumber = deliveryData?.phoneNumber;
  const orderId = deliveryData?.deliveryOrderId;
  const inning = deliveryData?.inningDescription;

  const statusControlMaster = useSelector((state: any) => state.cards?.statusCard);
  const isActiveControlMaster = statusControlMaster === CARD_IS_OPEN;

  const [inactiveVirtualCardModal, setInactiveVirtualCardModal] = useState<boolean>(false);

  const goToActivateCard = () => {
    if (isActiveControlMaster) {
      resetNavigationToScreen(
        navigation,
        [navigationScreenNames.physicalCard.stack, navigationScreenNames.physicalCard.activation],
        { orderId },
      );
    } else {
      setInactiveVirtualCardModal(true);
    }
  };

  const onPressGoConfigureCard = () => {
    setInactiveVirtualCardModal(false);
    resetNavigationToScreen(navigation, [navigationScreenNames.settingsStack]);
  };

  return {
    navigation,
    date,
    address,
    addressLabel,
    phoneNumber,
    inning,
    name,
    inactiveVirtualCardModal,
    setInactiveVirtualCardModal,
    goToActivateCard,
    onPressGoConfigureCard,
  };
};

export default useOrderStatus;
