import React from 'react';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import { currentDate, formatDate } from 'src/utils/date-time/date-time';
import { Calendar, CalendarDisabled } from 'assets/svgs';
import { AlertRedDot } from 'assets/svgs/';
import { Box, fonts, Text } from 'matrix-ui-components';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { useNavigation } from '@react-navigation/native';
import { useBalanceSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { useCreditCardBalance } from 'src/shared/hooks';
import { RFValue } from 'react-native-responsive-fontsize';
import HomeCardWrapper from '../HomeCardWrapper';
import { PaymentAmountSkeleton, PaymentDateSkeleton } from '../skeleton/PaymentsSkeleton';
import CardErrorRefresh from '../CardError';
import { usePaymentPresenter } from './payment.presenter';
import useDeliquentValues from '../hooks/useDelinquentValues';

interface PaymentsProps {
  isLoading?: boolean;
  disabled?: boolean;
}
type Color = 'black' | 'complementaryPumpking500' | 'FeedbackError600' | 'primary500';

const PaymentScreen = ({ isLoading, disabled }: PaymentsProps) => {
  const navigation = useNavigation();
  const { balance } = useBalanceSelectors();
  const { getBalance } = useCreditCardBalance();
  const {
    getPaymentOrders,
    hasPendingPaymentOrders,
    hasErrorOrders,
    pendingPaymentOrder,
    inProgressPaymentOrder,
  } = usePaymentPresenter();

  const {
    isDelinquentNotification,
    isDelinquentPaymentDisabled,
    paymentDelinquentColor,
    paymentDelinquentText,
  } = useDeliquentValues();

  const isBillingCycleStarted = currentDate().isSameOrBefore(inProgressPaymentOrder?.endDate, 'dates')
    && currentDate().isSameOrAfter(inProgressPaymentOrder?.startDate, 'dates');

  const billingCycleToPay = !isBillingCycleStarted ? inProgressPaymentOrder : pendingPaymentOrder;

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
    if (hasPendingPaymentOrders) {
      colorDate = 'FeedbackError600';
    }
    if (isDelinquentPaymentDisabled) {
      colorDate = 'primary500';
    }
    return colorDate;
  };

  const handleGetBalance = () => {
    if (balance?.available.PEN.currency !== 'PEN') {
      getBalance();
    }
  };

  const onSectionPress = () => {
    handleGetBalance();
    navigation.navigate(CardPaymentRoutesEnum.CardPaymentStack as never);
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
            <MtxDivider width={4} />
          </Box>
        </Box>
      </>
    </HomeCardWrapper>
  );
};
PaymentScreen.defaultProps = {
  isLoading: false,
  disabled: false,
};

export default PaymentScreen;
