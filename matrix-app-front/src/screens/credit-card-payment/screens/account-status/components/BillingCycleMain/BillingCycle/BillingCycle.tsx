import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import { ArrowRightIcon } from 'assets/svgs';
import { Box, Text, useTheme } from 'matrix-ui-components';
import { s } from 'src/utils/sizes';
import { BillingCycleComponentProps } from 'src/screens/credit-card-payment/shared/types/account-status.type';
import { BillingCycleSkeleton } from '../../Skeletons';
import { BillingCycleDate } from '../BillingCycleDate/BillingCycleDate';
import { BillingCycleBtnListMovement } from '../BillingCycleBtnListMovement/BillingCycleBtnListMovement';
import { DashBorder } from '../../DashBorder/DashBorder';

const CBillingCycle = ({
  billingCycleStarted,
  duePaymentDate,
  endDate,
  hasPendingPaymentOrders,
  isFirstBillingCycle,
  loading,
  month,
  navigate,
  splitDate,
  isErrorListMovements,
  fetchListMovements,
}: BillingCycleComponentProps) => {
  const { colors } = useTheme();
  if (loading) return <BillingCycleSkeleton isVisible />;
  if (!billingCycleStarted) {
    return (
      <Box flexDirection="row" padding="spacing-s" pt="spacing-sm">
        <Box
          flex={1}
          borderRightColor="gray100"
          borderRightWidth={1}
          borderStyle="dashed"
          paddingRight="spacing-xs"
          pl="spacing-xxxs"
        >
          <Text variant="Subtitle16Semibold" color="primaryDark" marginBottom="spacing-xxs">
            <Text variant="Subtitle16pxMedium" color="primary700">
              {`${i18n.t('accountStatus.payment-mouth')} `}
            </Text>
            <Text variant="Subtitle16Bold">{month}</Text>
          </Text>
          <Text variant="body12" color="primary500" mt="spacing-xxs" mb="spacing-xxxxxs">
            {i18n.t('accountStatus.last-day-for-payment')}
          </Text>
          <Text
            variant="body14SemiBold"
            mt="spacing-xxxxxs"
            color={hasPendingPaymentOrders ? 'FeedbackError600' : 'complementaryMint700'}
          >
            {duePaymentDate}
          </Text>
        </Box>
        <DashBorder width={1} height="100%" borderColor="complementaryOcean300" />
        <Box width="50%" paddingLeft="spacing-xs">
          <Text variant="body12" fontSize={RFValue(12, 750)} color="primary500">
            {i18n.t('accountStatus.billing-closure')}
          </Text>
          <Text variant="body14SemiBold" lineHeight={RFValue(26)} marginBottom="spacing-xxs">
            {endDate}
          </Text>
          <BillingCycleBtnListMovement
            navigate={navigate}
            isError={isErrorListMovements}
            isFirstBillingCycle={isFirstBillingCycle}
            onPress={fetchListMovements}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="row" py="spacing-s" px="spacing-xs">
      <Box flex={2}>
        <Text variant="body13Medium" marginBottom="spacing-xxxs" color="primaryDark">
          {i18n.t('accountStatus.billing-cycle')}
        </Text>
        <Box mt="spacing-xxxs" justifyContent="center" flexDirection="row">
          <Box flex={1} flexDirection="row" marginRight="spacing-xs">
            <Box
              paddingHorizontal="spacing-xxs"
              backgroundColor="complementaryOcean600"
              width="50%"
              borderBottomLeftRadius={8}
              borderTopLeftRadius={8}
              justifyContent="center"
              py="spacing-xxxs"
              borderRightColor="white"
              borderRightWidth={1}
              testID="billingCycleDateContainer"
            >
              <BillingCycleDate
                day={splitDate.startDay}
                month={splitDate.startMonth}
                year={splitDate.startYear}
              />
            </Box>
            <Box
              paddingRight="spacing-xxs"
              paddingLeft="spacing-xs"
              backgroundColor="complementaryOcean600"
              borderBottomRightRadius={8}
              borderTopRightRadius={8}
              width="50%"
              borderLeftColor="white"
              borderLeftWidth={1}
              justifyContent="center"
              testID="billingCycleDateContainer"
            >
              <BillingCycleDate
                day={splitDate.endDay}
                month={splitDate.endDayMonth}
                year={splitDate.endYear}
              />
              <Box
                position="absolute"
                zIndex={20}
                left={s(-12)}
                padding="spacing-xxxxs"
                borderRadius={50}
                backgroundColor="white"
                alignItems="center"
              >
                <ArrowRightIcon width={s(8)} height={s(8)} color={colors.complementaryOcean600} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box alignItems="flex-end" flexDirection="row" justifyContent="flex-end" mb="spacing-xxxs">
        <Box width={s(124)}>
          <BillingCycleBtnListMovement
            navigate={navigate}
            isError={isErrorListMovements}
            isFirstBillingCycle={isFirstBillingCycle}
            onPress={fetchListMovements}
          />
        </Box>
      </Box>
    </Box>
  );
};

export const BillingCycle = ({
  billingCycleStarted,
  duePaymentDate,
  endDate,
  hasPendingPaymentOrders,
  isFirstBillingCycle,
  loading,
  minimumPaymentAmount,
  month,
  navigate,
  splitDate,
  isErrorListMovements,
  fetchListMovements,
}: BillingCycleComponentProps) => (
  <Box
    marginHorizontal="spacing-m"
    borderRadius={18}
    elevation={6}
    backgroundColor="complementaryOcean050"
    marginBottom="spacing-m"
    testID="billing-cycle-started"
  >
    <CBillingCycle
      billingCycleStarted={billingCycleStarted}
      duePaymentDate={duePaymentDate}
      endDate={endDate}
      hasPendingPaymentOrders={hasPendingPaymentOrders}
      isFirstBillingCycle={isFirstBillingCycle}
      loading={loading}
      minimumPaymentAmount={minimumPaymentAmount}
      month={month}
      navigate={navigate}
      splitDate={splitDate}
      isErrorListMovements={isErrorListMovements}
      fetchListMovements={fetchListMovements}
    />
  </Box>
);
