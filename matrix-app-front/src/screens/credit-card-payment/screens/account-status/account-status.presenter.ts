import { useState } from 'react';
import { showToast, ToastType } from 'src/matrix-ui-components/components/toast';
import { i18n } from 'src/utils/core/MTXStrings';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { currentDate, formatDate } from 'src/utils/date-time/date-time';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { useMovementDate, usePaymentOrder, useCreditCardBalance } from 'src/shared/hooks';
import { accountOrderSelector, useBalanceSelectors } from 'src/core/libraries-implementation';

export const useAccountStatusPresenter = () => {
  const USD_MONEY = 'USD';
  const PEN_MONEY = 'PEN';
  const { balance } = useBalanceSelectors();
  const navigation:any = useNavigation();
  const [selectMoney, setSelectMoney] = useState<null | string>(null);
  const {
    listMovements,
    isErrorListMovements,
    fetchListMovements,
    loadingMovements,
  } = useMovementDate();
  const { isLoadingOrders } = usePaymentOrder();

  const {
    isLoadingBalance,
  } = useCreditCardBalance();

  const {
    inProgressPaymentOrder,
    hasPendingPaymentOrders,
    pendingPaymentOrder,
  } = useSelector(accountOrderSelector);

  const isFirstBillingCycle = listMovements.length < 1;

  const isBillingCycleStarted = currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
  && currentDate().isSameOrAfter(inProgressPaymentOrder?.startDate, 'dates');

  const billingCycleToPay = !isBillingCycleStarted ? inProgressPaymentOrder : pendingPaymentOrder;
  const paymentInProgress = billingCycleToPay?.hasPaymentInProcess;

  const summary = inProgressPaymentOrder && {
    startDate: formatDate(inProgressPaymentOrder.startDate, 'DD MMM YYYY'),
    endDate: formatDate(inProgressPaymentOrder.endDate, 'DD MMM YYYY'),
    month: formatDate(inProgressPaymentOrder.endDate, 'MMMM'),
    startMonth: formatDate(inProgressPaymentOrder.startDate, 'MMMM'),
    duePaymentDate: formatDate(inProgressPaymentOrder.dueDate, 'DD MMM YYYY'),
    billingCycleStarted: isBillingCycleStarted,
    splitDate: {
      startDay: formatDate(inProgressPaymentOrder.startDate, 'DD'),
      startMonth: formatDate(inProgressPaymentOrder.startDate, 'MMM'),
      startYear: formatDate(inProgressPaymentOrder.startDate, 'YYYY'),
      endDay: formatDate(inProgressPaymentOrder.endDate, 'DD'),
      endDayMonth: formatDate(inProgressPaymentOrder.endDate, 'MMM'),
      endYear: formatDate(inProgressPaymentOrder.endDate, 'YYYY'),
    },
  };

  const handleSelectOrder = (isSelected: string | null) => {
    if (isSelected !== selectMoney) {
      setSelectMoney(isSelected);
    } else if (selectMoney === PEN_MONEY || selectMoney === USD_MONEY) {
      setSelectMoney(null);
    } else setSelectMoney(isSelected);
  };

  const handlePayment = () => {
    navigation.navigate(CardPaymentRoutesEnum.CARD_PAYMENT);
  };

  const handleViewHistoryPayments = () => {
    if (loadingMovements) return;
    if (isFirstBillingCycle) {
      showToast({ type: ToastType.TypeInfo, title: i18n.t('accountStatements.without-prior-account-statements') });
      return;
    }
    navigation.navigate(CardPaymentRoutesEnum.LIST_ACCOUNT_STATEMENTS, listMovements);
  };

  return {
    handleViewHistoryPayments,
    handlePayment,
    handleSelectOrder,
    fetchListMovements,
    navigation,
    paymentInProgress,
    hasPendingPaymentOrders,
    summary,
    available: balance?.available.PEN.amount || 0,
    consumed: balance?.consumed.PEN.amount || 0,
    isLoadingBalance,
    isErrorListMovements,
    isLoadingOrders,
    inProgressPaymentOrder,
    isFirstBillingCycle,
    selectMoney,
    billingCycleToPay,
    isBillingCycleStarted,
    USD_MONEY,
    PEN_MONEY,
  };
};
