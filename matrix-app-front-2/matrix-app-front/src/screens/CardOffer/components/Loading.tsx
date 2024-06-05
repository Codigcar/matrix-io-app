/* eslint-disable global-require */
import React from 'react';
import LottieView from 'lottie-react-native';
import { Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';

const Loading = () => (
  <Box width={RFValue(140)} height={RFValue(140)}>
    <LottieView source={require('assets/lottie/ProcessRequestCard.json')} autoPlay loop />
  </Box>
);

export default Loading;
