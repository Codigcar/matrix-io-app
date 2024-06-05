import {
  Box, Button, Container, rebrandingTheme, Text,
} from 'matrix-ui-components';
import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import { BackgroundAltScreen } from 'assets/svgs';
import { ThemeProvider } from '@shopify/restyle';
import { moneyTypes } from '../../shared/types/account-status.type';
import { useAccountStatusPresenter } from './account-status.presenter';
import {
  Balance, BillingCycle, MoneyTypeButton, PaymentDelayMessage,
} from './components';
import { MoneyChangeSkeleton } from './components/Skeletons';

export const AccountStatusScreen = () => {
  const {
    handleViewHistoryPayments,
    handlePayment,
    handleSelectOrder,
    fetchListMovements,
    paymentInProgress,
    hasPendingPaymentOrders,
    summary,
    available,
    consumed,
    isLoadingBalance,
    isErrorListMovements,
    isLoadingOrders,
    navigation,
    inProgressPaymentOrder,
    isFirstBillingCycle,
    selectMoney,
    billingCycleToPay,
    isBillingCycleStarted,
    USD_MONEY,
    PEN_MONEY,
  } = useAccountStatusPresenter();

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
        <Box marginHorizontal="spacing-none" mt="spacing-xxs" testID="account-status">
          <Balance
            availableBalance={Helpers.formatMoney(available)}
            currentConsumption={Helpers.formatMoney(consumed)}
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
          {paymentInProgress ? <PaymentDelayMessage /> : null}
          <Box
            flexDirection="row"
            alignContent="space-between"
            marginHorizontal="spacing-m"
            mb="spacing-s"
          >
            <Box width="50%" paddingRight="spacing-xxs">
              <MoneyTypeButton
                moneyType={moneyTypes.SOLES}
                description={i18n.t('accountStatus.no-attentions')}
                onPress={() => handleSelectOrder(USD_MONEY)}
                selected={selectMoney === USD_MONEY}
                loading={isLoadingOrders}
                pendingPaymentAmount={billingCycleToPay?.pending?.amount ?? 0}
                minimumPaymentAmount={billingCycleToPay?.minimum?.amount ?? 0}
                currentConsumptionAmount={consumed}
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
            marginBottom="spacing-l"
            disabled={!selectMoney}
            testID="paymentContinue"
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
