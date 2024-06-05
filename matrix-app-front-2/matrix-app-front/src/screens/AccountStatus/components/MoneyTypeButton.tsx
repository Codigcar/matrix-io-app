import { Box, Text, TouchableOpacityBox } from 'matrix-ui-components';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import Helpers from 'src/utils/Helpers';
import FIllInfoCircle from 'matrix/assets/svgs/info-circle-fill.svg';
import { s } from 'src/utils/sizes';
import { InfoRed } from 'assets/svgs';
import { MoneyTypeButtonComponentProps, moneyTypes } from '../types/types';
import {
  paymentInProgressColorRender,
  RenderBeforeBilling,
  renderDefaultRender,
  RenderNotOutstandingPayments,
  RenderWithoutConsumption,
  selectedTitleTextColorHandler,
} from './paymentOrderStatusRender';
import { MoneyTypeButtonSkeleton } from './skeleton';
import DashBorder from './DashBorder';

const MAX_LENGTH = 7;

const MoneyTypeButton = ({
  currentConsumptionAmount,
  description,
  disabled = false,
  hasPendingPaymentOrders,
  loading,
  minimumPaymentAmount,
  moneyType,
  onPress,
  paymentInProgress = false,
  pendingPaymentAmount,
  selected,
  testID,
  isBillingCycleStarted,
}: MoneyTypeButtonComponentProps) => {
  const isSelectedTextColor = selectedTitleTextColorHandler(selected, paymentInProgress);
  const paymentInProgressAmountColor = paymentInProgressColorRender(selected, paymentInProgress);

  const pendingPaymentCharters = (pendingPaymentAmount?.toString() || '').length >= MAX_LENGTH;
  const miniumPaymentCharters = (minimumPaymentAmount?.toString() || '').length >= MAX_LENGTH;

  const moneySymbol = moneyType === moneyTypes.SOLES ? 'S/ ' : '$ ';
  const isDollars = moneyType === moneyTypes.DOLARES;
  const hasNoPendingPayment = +pendingPaymentAmount === 0;
  const hasNoMinimumPayment = +minimumPaymentAmount === 0;

  const hasNoConsumption =
    +currentConsumptionAmount === 0 && hasNoPendingPayment && hasNoMinimumPayment && isDollars;

  const isBeforeBilling = isBillingCycleStarted && hasNoPendingPayment && hasNoMinimumPayment;
  const showInfoRed = hasPendingPaymentOrders && minimumPaymentAmount && !paymentInProgress;

  const paymentOrderStatusRender = () => {
    if (isBeforeBilling) {
      return RenderBeforeBilling(description, selected, isSelectedTextColor);
    }
    if (hasNoConsumption) return RenderWithoutConsumption(selected);
    if (hasNoPendingPayment) return RenderNotOutstandingPayments();
    return renderDefaultRender(
      hasPendingPaymentOrders,
      isSelectedTextColor,
      paymentInProgressAmountColor,
      pendingPaymentCharters,
      pendingPaymentAmount,
      moneySymbol,
      minimumPaymentAmount,
      miniumPaymentCharters,
    );
  };

  if (loading) return <MoneyTypeButtonSkeleton />;

  return (
    <TouchableOpacityBox
      onPress={onPress}
      activeOpacity={1}
      disabled={disabled}
      testID={testID}
      flex={1}
      backgroundColor={selected ? 'primary1000' : 'primary100'}
      padding="spacing-xs"
      borderRadius={18}
      height={s(217)}
    >
      <Box position="absolute" right={RFValue(-9)} top={RFValue(-10)} zIndex={1}>
        {showInfoRed ? <InfoRed /> : null}
        {paymentInProgress ? <FIllInfoCircle /> : null}
      </Box>
      <Box flex={1} flexDirection="column">
        <Text variant="Subtitle16Semibold" color={selected ? 'primary000' : 'primary1000'}>
          {moneyType}
        </Text>
        <Box marginTop="spacing-xxs">{paymentOrderStatusRender()}</Box>
        <Box flex={1} />
        <Box paddingVertical="spacing-xxxxxs">
          <DashBorder marginVertical="spacing-xxs" />
        </Box>
        <Text variant="body12" color="primary500">
          {i18n.t('accountStatus.current-consummation')}
        </Text>
        <Text variant="Subtitle16pxMedium" mt="spacing-xxxs" color={paymentInProgressAmountColor}>
          {Helpers.formatMoney(currentConsumptionAmount, moneySymbol)}
        </Text>
      </Box>
    </TouchableOpacityBox>
  );
};
export default MoneyTypeButton;
