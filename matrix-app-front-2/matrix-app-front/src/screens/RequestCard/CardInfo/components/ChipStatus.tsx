import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { i18n } from 'src/utils/core/MTXStrings';
import { CARD_IS_INACTIVE, CARD_IS_OPEN } from 'src/utils/constants';

const ChipStatus = ({ state }: { state: string }) => {
  const colorState =
    state === CARD_IS_OPEN
      ? 'success'
      : state === CARD_IS_INACTIVE
      ? 'FeedbackWarning600'
      : 'primary500';

  const labelState =
    state === CARD_IS_OPEN
      ? 'card-info.active'
      : state === CARD_IS_INACTIVE
      ? 'card-info.inactive'
      : 'card-info.pending';

  return (
    <Box
      backgroundColor="complementaryPrimary100"
      borderRadius={RFValue(50)}
      px="spacing-xs"
      py="spacing-xxs"
      flexDirection="row"
      alignItems="center"
    >
      <Box
        width={RFValue(8)}
        height={undefined}
        aspectRatio={1}
        borderRadius={RFValue(8)}
        backgroundColor={colorState}
        mr="spacing-xxs"
      />
      <Text variant="body13pxRegular">{i18n.t(labelState)}</Text>
    </Box>
  );
};
export default ChipStatus;
