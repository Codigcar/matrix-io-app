import React from 'react';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { RFValue } from 'react-native-responsive-fontsize';
import Helpers from 'src/utils/Helpers';
import {
  Box, Text, Theme, useTheme,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { s } from 'src/utils/sizes';
import { ColorProps as ColorP } from '@shopify/restyle';
import { CardWithStar, HappyFaceIcon, MoneyExchangeIcon } from 'assets/svgs';

type ColorProps = ColorP<Theme>['color'];

export const RenderBeforeBilling = (
  description: String,
  selected: boolean,
  isSelectedTextColor?: ColorProps,
) => {
  const { colors } = useTheme();
  return (
    <Box marginTop="spacing-s">
      <MoneyExchangeIcon color={selected ? colors.white : colors.primary1000} />
      <Text color={isSelectedTextColor === 'primary500' ? 'primary800' : isSelectedTextColor} variant="body12" marginTop="spacing-xxs">
        {description}
      </Text>
    </Box>
  );
};

export const RenderWithoutConsumption = (selected: boolean) => {
  const { colors } = useTheme();
  return (
    <Box marginTop="spacing-s">
      <CardWithStar color={selected ? colors.white : colors.primary1000} />
      <Text color={selected ? 'primaryLigth' : 'primary800'} variant="body12" marginTop="spacing-xxs">
        {i18n.t('accountStatus.not-consumed-this-money')}
      </Text>
    </Box>
  );
};

export const RenderNotOutstandingPayments = () => {
  const { colors } = useTheme();
  return (
    <Box marginTop="spacing-xm">
      <HappyFaceIcon width={s(20)} height={s(20)} color={colors.complementaryMint700} />
      <Text
        color="complementaryMint700"
        variant="body12"
        marginTop="spacing-xxs"
        marginBottom="spacing-none"
      >
        {i18n.t('accountStatus.without-consumption')}
      </Text>
    </Box>
  );
};

export const renderDefaultRender = (
  hasPendingPaymentOrders: boolean,
  isSelectedTextColor: ColorProps,
  paymentInProgressColor: ColorProps,
  pendingPaymentCharters: boolean,
  pendingPaymentAmount: number,
  moneySymbol: string,
  minimumPaymentAmount: number,
  miniumPaymentCharters: boolean,
) => (
  <>
    <Text
      variant="body12"
      color={hasPendingPaymentOrders ? 'FeedbackError600' : isSelectedTextColor}
      fontSize={RFValue(12, 700)}
    >
      {i18n.t('accountStatus.payment-for-the-month')}
    </Text>
    <Text
      variant="Subtitle20SemiBold"
      marginTop="spacing-xxxs"
      color={paymentInProgressColor}
      fontSize={RFValue(pendingPaymentCharters ? 14 : 17.5)}
    >
      {Helpers.formatMoney(pendingPaymentAmount, moneySymbol)}
    </Text>

    <Text
      variant="body12"
      marginTop="spacing-xxs"
      color={hasPendingPaymentOrders ? 'FeedbackError600' : isSelectedTextColor}
    >
      {i18n.t('accountStatus.minimum-payment')}
    </Text>
    <Text
      marginTop="spacing-xxxs"
      variant="Subtitle16Semibold"
      color={paymentInProgressColor}
      fontSize={RFValue(miniumPaymentCharters ? 10.5 : 14)}
    >
      {Helpers.formatMoney(minimumPaymentAmount, moneySymbol)}
    </Text>
  </>
);

export const paymentInProgressColorRender = (
  selected: boolean,
  paymentInProgress: boolean,
): ColorProps => {
  let warningPaymentInProgress: ColorProps;
  if (selected) {
    warningPaymentInProgress = 'white';
  } else if (paymentInProgress) {
    warningPaymentInProgress = 'primary600';
  } else {
    warningPaymentInProgress = 'primaryDarkest';
  }
  return warningPaymentInProgress;
};

export const selectedTitleTextColorHandler = (
  selected: boolean,
  paymentInProgress: boolean,
): ColorProps => {
  let titleColor: ColorProps;
  if (selected) {
    titleColor = 'primaryLigth';
  } else if (paymentInProgress) {
    titleColor = 'gray200';
  } else {
    titleColor = 'primary500';
  }
  return titleColor;
};
