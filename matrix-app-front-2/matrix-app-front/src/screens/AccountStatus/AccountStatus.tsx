import {
  Box, Button, Container, rebrandingTheme, Text,
} from 'matrix-ui-components';
import React, { useState } from 'react';
import { showToast, ToastType } from 'src/matrix-ui-components/components/toast';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import { useSelector } from 'react-redux';
import { currentDate, formatDate } from 'src/utils/date-time/date-time';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ThemeProvider } from '@shopify/restyle';
import { BackgroundAltScreen } from 'assets/svgs';
import MoneyTypeButton from './components/MoneyTypeButton';
import Balance from './components/Balance';
import { BillingCycle } from './components/BillingCycle';
import MoneyChangeSkeleton from './components/skeleton/MoneyChangeSkeleton';
import PaymentDelayMessage from './components/PaymentDelayMessage';
import useRequestListMovementDates from './hooks/useRequestListMovementDates';
import { accountOrderSelector } from './selectors/accountStatusSelectors';
import { moneyTypes } from './types/types';
import { useRequestBalance, useRequestOrders } from './hooks';

const USD_MONEY = 'USD';
const PEN_MONEY = 'PEN';

const AccountStatus = ({ navigation }: NavigationPropsType) => {
  const [selectMoney, setSelectMoney] = useState<null | string>(null);
  const {
    listMovements,
    isErrorListMovements,
    fetchListMovements,
    loadingMovements,
  } = useRequestListMovementDates();
  const { isLoadingOrders } = useRequestOrders();

  const {
    available,
    consumed,
    isLoadingBalance,
  } = useRequestBalance();

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
    navigation.navigate('CardPayment');
  };

  const handleViewHistoryPayments = () => {
    if (loadingMovements) return;
    if (isFirstBillingCycle) {
      showToast({ type: ToastType.TypeInfo, title: i18n.t('accountStatements.without-prior-account-statements') });
      return;
    }
    navigation.navigate(navigationScreenNames.listAccountStatements, listMovements);
  };

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        hasGradient={false}
        background={BackgroundAltScreen}
        imageBackground="none"
        isHeaderVisible
        isScrollable
        goBackNavigate={() => navigation.goBack()}
        headerTitle={i18n.t('accountStatus.header-title')}
      >
        <Box marginHorizontal="spacing-none" mt="spacing-xxs">
          <Balance
            availableBalance={Helpers.formatMoney(available)}
            currentConsumption={Helpers.formatMoney(consumed?.PEN)}
            loading={isLoadingBalance}
          />
          <BillingCycle
            billingCycleStarted={summary?.billingCycleStarted ?? false}
            duePaymentDate={summary?.duePaymentDate ?? ''}
            endDate={summary?.endDate ?? ''}
            hasPendingPaymentOrders={hasPendingPaymentOrders}
            isFirstBillingCycle={isFirstBillingCycle}
            loading={isLoadingOrders}
            minimumPaymentAmount={inProgressPaymentOrder?.minimum?.amount ?? 0}
            month={summary?.month ?? ''}
            navigate={handleViewHistoryPayments}
            splitDate={summary?.splitDate}
            isErrorListMovements={isErrorListMovements}
            fetchListMovements={fetchListMovements}
          />
          {isLoadingOrders ? (
            <MoneyChangeSkeleton isVisible />
          ) : (
            <Text
              variant="Subtitle18Medium"
              marginLeft="spacing-m"
              marginBottom={paymentInProgress ? 'spacing-xxs' : 'spacing-s'}
            >
              {i18n.t('accountStatus.select-money-payment')}
            </Text>
          )}
          {
            paymentInProgress ? <PaymentDelayMessage /> : null
          }
          <Box flexDirection="row" alignContent="space-between" marginHorizontal="spacing-m" mb="spacing-s">
            <Box width="50%" paddingRight="spacing-xxs">
              <MoneyTypeButton
                moneyType={moneyTypes.SOLES}
                description={i18n.t('accountStatus.no-attentions')}
                onPress={() => handleSelectOrder(USD_MONEY)}
                selected={selectMoney === USD_MONEY}
                loading={isLoadingOrders}
                pendingPaymentAmount={billingCycleToPay?.pending?.amount ?? 0}
                minimumPaymentAmount={billingCycleToPay?.minimum?.amount ?? 0}
                currentConsumptionAmount={consumed?.PEN}
                paymentInProgress={paymentInProgress}
                testID="solesOrder"
                hasPendingPaymentOrders={hasPendingPaymentOrders}
                isBillingCycleStarted={isBillingCycleStarted}
              />
            </Box>
            <Box width="50%" paddingLeft="spacing-xxs">
              <MoneyTypeButton
                moneyType={moneyTypes.DOLARES}
                description={i18n.t('accountStatus.not-consumed-this-money')}
                onPress={() => handleSelectOrder(PEN_MONEY)}
                selected={selectMoney === PEN_MONEY}
                loading={isLoadingOrders}
                lastDayPaymentDate=""
                startBillingCycleDate=""
                closingBillingCycleDate=""
                pendingPaymentAmount={0}
                minimumPaymentAmount={0}
                currentConsumptionAmount={0}
                disabled
                testID="dollarOrder"
                hasPendingPaymentOrders={false}
                isBillingCycleStarted={false}
              />
            </Box>
          </Box>
          <Button
            label={i18n.t('accountStatus.continue-with-payment')}
            onPress={handlePayment}
            variant={selectMoney ? 'primary' : 'disabled'}
            marginHorizontal="spacing-m"
            disabled={!selectMoney}
            testID="paymentContinue"
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AccountStatus;
