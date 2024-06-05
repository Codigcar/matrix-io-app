import React from 'react';
import { Text, Box } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { formatDate } from 'src/utils/date-time/date-time';
import {
  CalendarSummary,
  LocationSummary,
  PhoneSummary,
  ClockSummary,
  UserSquare,
} from 'assets/svgs/index';
import { RFValue } from 'react-native-responsive-fontsize';

interface OrderSumaryProps {
  name: string;
  date: string;
  hour: string;
  address: string;
  addressLabel: string;
  phoneNumber: string;
}

const OrderSumary = ({
  name,
  date,
  hour,
  address,
  addressLabel,
  phoneNumber,
}: OrderSumaryProps) => (
  <>
    <Text variant="Subtitle16Semibold" mb="spacing-xxs" color="primaryDark">
      {i18n.t('physical-card.order-status.title-info')}
    </Text>
    <Box flexDirection="row" alignItems="center" my="spacing-xxxs" pr="spacing-s">
      <UserSquare width={RFValue(23)} height={RFValue(23)} />
      <Text px="spacing-xxs" variant="body14Regular">
        {name}
      </Text>
    </Box>
    <Box flexDirection="row" alignItems="center" my="spacing-xxxs" pr="spacing-s">
      <LocationSummary width={RFValue(23)} height={RFValue(23)} />
      <Box>
        <Text numberOfLines={2} ml="spacing-xxs" variant="body14Regular">
          {address}
        </Text>
        <Text numberOfLines={2} ml="spacing-xxs" variant="body14Regular">
          {addressLabel}
        </Text>
      </Box>
    </Box>
    <Box flexDirection="row" alignItems="center" mt="spacing-xxxs">
      <PhoneSummary />
      <Text ml="spacing-xxs" variant="body14Regular">
        {phoneNumber}
      </Text>
    </Box>
    <Text variant="Subtitle16Semibold" mt="spacing-s" mb="spacing-xxs" color="primaryDark">
      {i18n.t('physical-card.order-status.title-schedule')}
    </Text>
    <Box flexDirection="row" alignItems="center" my="spacing-xxxs">
      <CalendarSummary width={RFValue(23)} height={RFValue(23)} />
      <Text ml="spacing-xxs" variant="body14Regular">
        {formatDate(date)}
      </Text>
    </Box>
    <Box flexDirection="row" alignItems="center" mt="spacing-xxxs">
      <ClockSummary width={RFValue(23)} height={RFValue(23)} />
      <Text ml="spacing-xxs" variant="body14Regular">
        {hour}
      </Text>
    </Box>
  </>
);

export default OrderSumary;
