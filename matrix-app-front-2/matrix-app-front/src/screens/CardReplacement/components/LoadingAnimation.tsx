/* eslint-disable global-require */
import React from 'react';
import LottieView from 'lottie-react-native';
import { Box } from 'matrix-ui-components';

const LoadingAnimation = () => (
  <Box width={140} height={140}>
    <LottieView source={require('assets/lottie/ProcessRequestCard.json')} autoPlay loop />
  </Box>
);

export default LoadingAnimation;
