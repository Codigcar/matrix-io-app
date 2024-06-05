import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { TouchableOpacity } from 'react-native';
import { SupplementaryCardChangePinProps } from '../types/types';
import { string } from '../strings/string';
import { testID } from '../strings/testID';

const SupplementaryCardChangePin: React.FC<SupplementaryCardChangePinProps> = (props) => {
  const { onPress, testID: testIDProp } = props;
  return (
    <Box testID={testIDProp} mt="spacing-xs" ml="spacing-xxxxxs">
      <Box flexDirection="row" width="100%" justifyContent="space-between" mt="spacing-xxxs">
        <Text variant="Subtitle16Semibold" color="primary1000">
          {string.cardConfigurationSupplementaryCardLabel}
        </Text>
        <Text variant="body13pxRegular" color="primary500">
          {string.cardConfigurationSupplementaryCardHelper}
        </Text>
      </Box>
      <Box flexDirection="row" width="100%" mt="spacing-xxxs">
        <Text variant="body13Regular" color="primary700">
          {string.cardConfigurationSupplementaryCardMessage}
        </Text>
        <TouchableOpacity
          testID={testID.supplementaryCardChangePinActionButton}
          onPress={() => onPress()}
        >
          <Text
            variant="body13Regular"
            color="complementaryIndigo600"
            textDecorationLine="underline"
          >
            {string.cardConfigurationSupplementaryCardActionText}
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default SupplementaryCardChangePin;
