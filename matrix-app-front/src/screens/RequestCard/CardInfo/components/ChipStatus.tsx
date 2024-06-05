import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { CARD_IS_INACTIVE, CARD_IS_OPEN } from 'src/utils/constants';
import { ChipStatusProps } from '../../shared/types/components';
import { string } from '../../shared/strings/string';

const ChipStatus: React.FC<ChipStatusProps> = (props) => {
  const { state } = props;
  const colorState =
    state === CARD_IS_OPEN
      ? 'success'
      : state === CARD_IS_INACTIVE
      ? 'FeedbackWarning600'
      : 'primary500';

  const labelState =
    state === CARD_IS_OPEN
      ? string.cardInfoActive
      : state === CARD_IS_INACTIVE
      ? string.cardInfoInactive
      : string.cardInfoPending;

  return (
    <Box
      backgroundColor="complementaryPrimary100"
      borderRadius={RFValue(50)}
      px="spacing-xs"
      py="spacing-xxs"
      flexDirection="row"
      alignItems="center"
      testID="chip-container"
    >
      <Box
        width={RFValue(8)}
        height={undefined}
        aspectRatio={1}
        borderRadius={RFValue(8)}
        backgroundColor={colorState}
        mr="spacing-xxs"
        testID="chip-color"
      />
      <Text variant="body13pxRegular" testID="chip-label">
        {labelState}
      </Text>
    </Box>
  );
};
export default ChipStatus;
