import { currentDate, dateParse } from 'src/utils/date-time/date-time';
import { useSelector } from 'react-redux';
import {
  AccountStatusProps,
  PaymentOrder,
  paymentOrdersStatus,
  paymentOrdersTypes,
} from '../../states/credit-card/types/balance.type';

export const accountBalanceSelector = (state: AccountStatusProps) =>
  state?.account?.balance?.getReqBalanceSuccess;

export const getBalanceSelector = (state: any) => state?.account?.balance?.getReqBalanceSuccess;

export const accountBalanceLoading = (state: AccountStatusProps) =>
  state?.account?.balance?.isLoading;

export const accountBalanceError = (state: AccountStatusProps) =>
  state?.account?.balance?.getReqBalanceError;

export const accountOrdersSelector = (state: AccountStatusProps) =>
  state?.account?.orders?.getReqOrdersSuccess;

export const accountOrdersErrorSelector = (state: RootState) =>
  state?.account?.orders?.getReqOrdersError;

export const accountOrdersLoading = (state: AccountStatusProps) =>
  state?.account?.orders?.isLoading;

export const accountOrderSelector = (
  state: AccountStatusProps,
): {
  inProgressPaymentOrder: PaymentOrder | null;
  hasPendingPaymentOrders: boolean;
  pendingPaymentOrder: PaymentOrder | null;
} => {
  const paymentOrders = state?.account?.orders?.getReqOrdersSuccess;

  if (!Array.isArray(paymentOrders)) {
    return {
      inProgressPaymentOrder: null,
      hasPendingPaymentOrders: false,
      pendingPaymentOrder: null,
    };
  }

  const searchPendingPaymentOrders = paymentOrders
    .filter(
      ({
        type, status, dueDate, pending: { amount },
      }: PaymentOrder) =>
        type === paymentOrdersTypes.ORDER_CLOSE
        && status === paymentOrdersStatus.ORDER_PENDING
        && amount > 0
        && currentDate().isAfter(dueDate, 'dates'),
    )
    .reverse();

  const searchInProgressPaymentOrder = paymentOrders.filter((order: PaymentOrder) => {
    if (
      order.type === paymentOrdersTypes.ORDER_CLOSE
      && (order.status === paymentOrdersStatus.ORDER_PENDING
        || order.status === paymentOrdersStatus.ORDER_PAID)
      && currentDate().isAfter(order.endDate, 'dates')
      && currentDate().isSameOrBefore(order.dueDate, 'dates')
    ) {
      return order;
    }

    return (
      order.type === paymentOrdersTypes.ORDER_OPEN
      && order.status === paymentOrdersStatus.ORDER_PENDING
    );
  });

  const inProgressPaymentOrder = searchInProgressPaymentOrder[0];
  const hasPendingPaymentOrders = searchPendingPaymentOrders.length > 0 && searchPendingPaymentOrders[0]?.minimum?.amount > 0;
  const pendingPaymentOrder = searchPendingPaymentOrders[0];

  if (hasPendingPaymentOrders) {
    return {
      inProgressPaymentOrder,
      hasPendingPaymentOrders,
      pendingPaymentOrder,
    };
  }

  const orderPaidBeforeLastPaymentDay = paymentOrders.filter((order: PaymentOrder) => {
    const isPaymentMadeAheadTime = currentDate().isBefore(dateParse(order.dueDate), 'day')
      || currentDate().isSame(dateParse(order.dueDate), 'day');

    return (
      order.type === paymentOrdersTypes.ORDER_CLOSE
      && order.status === paymentOrdersStatus.ORDER_PAID
      && isPaymentMadeAheadTime
    );
  });

  const paymentMadeAheadTime = orderPaidBeforeLastPaymentDay.length > 0;
  if (paymentMadeAheadTime) {
    return {
      inProgressPaymentOrder,
      hasPendingPaymentOrders,
      pendingPaymentOrder,
    };
  }

  return {
    inProgressPaymentOrder,
    hasPendingPaymentOrders,
    pendingPaymentOrder,
  };
};

export function useBalanceSelectors() {
  const balance = useSelector(accountBalanceSelector);

  return {
    balance,
  };
}
