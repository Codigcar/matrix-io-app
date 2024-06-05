import React from 'react';
import { Text, Box } from 'matrix-ui-components';
import { formatDate } from 'src/utils/date-time/date-time';
import {
  CalendarSummary,
  LocationSummary,
  PhoneSummary,
  ClockSummary,
  UserSquare,
} from 'assets/svgs/index';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../shared/strings/string';
import { OrderSumaryProps } from '../shared/types/components';

const OrderSumary: React.FC<OrderSumaryProps> = (props) => {
  const {
    name, date, hour, address, addressLabel, phoneNumber,
  } = props;
  return (
    <>
      <Text variant="Subtitle16Semibold" mb="spacing-xxs" color="primaryDark">
        {string.physicalCardOrderStatusTitleInfo}
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
        {string.physicalCardOrderStatusTitleSchedule}
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
};

export default OrderSumary;
