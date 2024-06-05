import { accountOrderSelector } from 'src/core/libraries-implementation/state-manager/selectors/account-status/account-status.selectors';
import { useSelector } from 'react-redux';
import { currentDate } from 'src/utils/date-time/date-time';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { useNavigation } from '@react-navigation/native';
import { usePaymentOrder } from 'src/shared/hooks';

export const usePaymentPresenter = () => {
  const { navigate } = useNavigation();

  const { hasErrorOrders, getPaymentOrders } = usePaymentOrder();
  const {
    hasPendingPaymentOrders,
    pendingPaymentOrder,
    inProgressPaymentOrder,
  } = useSelector(accountOrderSelector);

  const isBillingCycleStarted = currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
  && currentDate().isSameOrAfter(inProgressPaymentOrder?.startDate, 'dates');

  const billingCycleToPay = !isBillingCycleStarted ? inProgressPaymentOrder : pendingPaymentOrder;

  const onSectionPress = () => navigate(CardPaymentRoutesEnum.CardPaymentStack as any);

  return {
    getPaymentOrders,
    onSectionPress,
    hasPendingPaymentOrders,
    hasErrorOrders,
    billingCycleToPay,
    pendingPaymentOrder,
    inProgressPaymentOrder,
  };
};
