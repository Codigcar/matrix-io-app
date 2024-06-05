import React from 'react';
import { CronoPropsType } from 'src/types/types';
import { Box, Text } from 'matrix-ui-components';
import Background from 'assets/svgs/background-timer.svg';
import { RFValue } from 'react-native-responsive-fontsize';

const Crono = (props: CronoPropsType) => {
  const { time } = props;
  return (
    <Box>
      <Box position="absolute" width="100%" height="100%">
        <Background width="100%" height="100%" />
      </Box>
      <Box py="spacing-xxxxxs" justifyContent="center" alignItems="center" flexDirection="row">
        <Box mr="spacing-xxxs" backgroundColor="FeedbackError600" width={RFValue(8)} height={RFValue(8)} borderRadius={RFValue(4)} />
        <Text my="spacing-xxs" variant="Subtitle16Semibold" color="white" textAlign="center">{time}</Text>
      </Box>
    </Box>
  );
};

export default Crono;
