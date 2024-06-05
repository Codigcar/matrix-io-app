import React from 'react';
import LottieView from 'lottie-react-native';
import loadingSpin from 'assets/lottie/LoadingAnimation2.json';
import { Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
export const Spinner = ({width = RFValue(32), height = RFValue(32)}) => {
  return (
    <Box
      width={width}
      height={height}
      alignSelf={'center'}
    >
      <LottieView source={loadingSpin} autoPlay loop />
    </Box>
  );
};