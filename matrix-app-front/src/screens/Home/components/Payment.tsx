import React from 'react';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import {
  accountOrderSelector,
  getBalanceSelector,
} from 'src/screens/AccountStatus/selectors/accountStatusSelectors';
import { useSelector } from 'react-redux';
import { currentDate, formatDate } from 'src/utils/date-time/date-time';
import { Calendar } from 'assets/svgs';
import { Box, fonts, Text } from 'matrix-ui-components';
import { useRequestBalance, useRequestOrders } from 'src/screens/AccountStatus/hooks';
import HomeCardWrapper from './HomeCardWrapper';
import { PaymentAmountSkeleton, PaymentDateSkeleton } from './skeleton/PaymentsSkeleton';
import CardErrorRefresh from './CardError';

interface PaymentsProps {
  isLoading?: boolean;
  navigate: Function;
  disabled?: boolean;
}

const Payments = ({ isLoading, navigate, disabled }: PaymentsProps) => {
  const balance = useSelector(getBalanceSelector);
  const {
    hasPendingPaymentOrders,
    pendingPaymentOrder,
    inProgressPaymentOrder,
  } = useSelector(accountOrderSelector);
  const { hasErrorOrders, getPaymentOrders } = useRequestOrders();
  const { getBalance } = useRequestBalance();

  const isBillingCycleStarted = currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
    && currentDate().isSameOrAfter(inProgressPaymentOrder?.startDate, 'dates');

  const billingCycleToPay = !isBillingCycleStarted ? inProgressPaymentOrder : pendingPaymentOrder;

  const handleGetBalance = () => {
    if (balance.length === 0) {
      getBalance();
    }
  };

  const onSectionPress = () => {
    handleGetBalance();
    navigate('AccountStatus');
  };

  if (hasErrorOrders) {
    return (
      <HomeCardWrapper disabled color="complementarySteel100">
        <CardErrorRefresh
          disabled={disabled}
          colorText="primary500"
          colorTextBold="primaryDarkest"
          icon={<Calendar />}
          onPress={getPaymentOrders}
        />
      </HomeCardWrapper>
    );
  }

  return (
    <HomeCardWrapper disabled={disabled} onPress={onSectionPress} color="complementarySteel100">
      <>
        <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1}>
            {isLoading ? (
              <PaymentAmountSkeleton isVisible />
            ) : (
              <Text variant="subHeaderCard">
                {Helpers.formatCurrency(billingCycleToPay?.pending?.amount ?? 0.0, {
                  removeDecimalsWhenRounded: true,
                })}
              </Text>
            )}
          </Box>
          <Calendar />
        </Box>
        <Box mt="spacing-xxxs">
          <Text variant="smallLabelCard" color="black">
            {i18n.t('home-payments-title')}
          </Text>
          <Box mt="spacing-xxxxxs" flexDirection="row">
            <Text variant="smallLabelCard" color="complementarySteel900">
              {i18n.t('home-payments-date-label')}
            </Text>
            {isLoading ? (
              <PaymentDateSkeleton isVisible />
            ) : (
              <Text
                pl="spacing-xxxs"
                variant="smallLabelCard"
                color={hasPendingPaymentOrders ? 'FeedbackError600' : 'black'}
                fontFamily={fonts.outfitSemibold}
                fontWeight="600"
              >
                {formatDate(
                  pendingPaymentOrder && currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
                    ? pendingPaymentOrder?.dueDate
                    : inProgressPaymentOrder?.dueDate,
                  'MMMM DD',
                )}
              </Text>
            )}
            <MtxDivider width={4} />
          </Box>
        </Box>
      </>
    </HomeCardWrapper>
  );
};
Payments.defaultProps = {
  isLoading: false,
  disabled: false,
};

export default Payments;
