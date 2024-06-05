import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import {
  accountOrderSelector,
  getBalanceSelector,
} from 'src/screens/AccountStatus/selectors/accountStatusSelectors';
import { useSelector } from 'react-redux';
import { currentDate, formatDate } from 'src/utils/date-time/date-time';
import { AlertRedDot, Calendar, CalendarDisabled } from 'assets/svgs';
import { Box, fonts, Text } from 'matrix-ui-components';
import { useRequestBalance, useRequestOrders } from 'src/screens/AccountStatus/hooks';
import { RFValue } from 'react-native-responsive-fontsize';
import HomeCardWrapper from './HomeCardWrapper';
import { PaymentAmountSkeleton, PaymentDateSkeleton } from './skeleton/PaymentsSkeleton';
import CardErrorRefresh from './CardError';
import useDeliquentValues from './hooks/useDelinquentValues';

interface PaymentsProps {
  isLoading?: boolean;
  navigate: Function;
  disabled?: boolean;
}
type Color = 'black' | 'complementaryPumpking500' | 'FeedbackError600' | 'primary500';

const Payments = ({ isLoading, navigate, disabled }: PaymentsProps) => {
  const balance = useSelector(getBalanceSelector);
  const {
    pendingPaymentOrder,
    inProgressPaymentOrder,
  } = useSelector(accountOrderSelector);
  const { hasErrorOrders, getPaymentOrders } = useRequestOrders();
  const { getBalance } = useRequestBalance();

  const isBillingCycleStarted = currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
    && currentDate().isSameOrAfter(inProgressPaymentOrder?.startDate, 'dates');

  const billingCycleToPay = !isBillingCycleStarted ? inProgressPaymentOrder : pendingPaymentOrder;

  const {
    isDelinquentNotification,
    isDelinquentPaymentDisabled,
    paymentDelinquentColor,
    paymentDelinquentText,
  } = useDeliquentValues();

  const getColorDate = (): Color => {
    let colorDate: Color = 'black';
    if (paymentDelinquentColor) {
      switch (paymentDelinquentColor) {
        case 'WARNING':
          colorDate = 'complementaryPumpking500';
          break;
        case 'DANGER':
          colorDate = 'FeedbackError600';
          break;
        default:
          colorDate = 'black';
          break;
      }
    }
    if (isDelinquentPaymentDisabled) {
      colorDate = 'primary500';
    }
    return colorDate;
  };

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
    <HomeCardWrapper disabled={disabled} onPress={onSectionPress} color={isDelinquentPaymentDisabled ? 'primary100' : 'complementarySteel100'}>
      <>
        {isDelinquentNotification && !isDelinquentPaymentDisabled && (
          <Box position="absolute" top={-18} zIndex={1} right={-18}>
            <AlertRedDot />
          </Box>
        )}
        <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1} justifyContent="center">
            {isLoading ? (
              <Box height={RFValue(19)}>
                <PaymentAmountSkeleton isVisible />
              </Box>
            ) : (
              <Text variant="subHeaderCard" color={isDelinquentPaymentDisabled ? 'primary500' : 'black'}>
                {Helpers.formatCurrency(billingCycleToPay?.pending?.amount ?? 0.0, {
                  removeDecimalsWhenRounded: true,
                })}
              </Text>
            )}
          </Box>
          {isDelinquentPaymentDisabled ? (
            <CalendarDisabled />
          ) : (<Calendar />)}
        </Box>
        <Box pt="spacing-xxxs">
          <Text variant="smallLabelCard" color={isDelinquentPaymentDisabled ? 'primary500' : 'black'}>
            {i18n.t('home-payments-title')}
          </Text>
          <Box mt="spacing-xxxxxs" flexDirection="row">
            <Text variant="smallLabelCard" color={isDelinquentPaymentDisabled ? 'primary500' : 'complementarySteel900'}>
              {i18n.t('home-payments-date-label')}
            </Text>
            {isLoading ? (
              <PaymentDateSkeleton isVisible />
            ) : (
              <Box>
                <Text
                  pl="spacing-xxxs"
                  variant="smallLabelCard"
                  color={getColorDate()}
                  fontFamily={fonts.outfitSemibold}
                  fontWeight="600"
                >
                  {(paymentDelinquentText) || formatDate(
                    pendingPaymentOrder && currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
                      ? pendingPaymentOrder?.dueDate
                      : inProgressPaymentOrder?.dueDate,
                    'MMMM DD',
                  )}
                </Text>
              </Box>
            )}
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
