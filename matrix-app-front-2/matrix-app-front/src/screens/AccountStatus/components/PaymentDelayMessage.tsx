import {
  Box, Text,
} from 'matrix-ui-components';
import InfoCircle from 'assets/svgs/info-warning-circle.svg';
import { i18n } from 'src/utils/core/MTXStrings';
import React from 'react';

const PaymentDelayMessage = () => (
  <Box
    flexDirection="row"
    marginHorizontal="spacing-m"
    marginBottom="spacing-s"
    testID="paymentInProgressContainer"
  >
    <InfoCircle />
    <Box flex={1}>
      <Text variant="body" marginLeft="spacing-xxs">
        <Text
          variant="body13Regular"
          color="primary800"
        >
          {i18n.t('paymentSuccess.delay-information-info')}
        </Text>
        <Text
          variant="body13Regular"
          color="complementaryPumpking500"
        >
          {i18n.t('paymentSuccess.next-few-minutes')}
        </Text>
      </Text>
    </Box>
  </Box>
);

export default PaymentDelayMessage;
