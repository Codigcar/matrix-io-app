import React from 'react';
import LottieView from 'lottie-react-native';
import { Box } from 'matrix-ui-components';

/* const styles = StyleSheet.create({
  loading: {

  }
}) */

const LoadingKYC = () => (
  <Box width={50} height={100}>
    <LottieView source={require('assets/lottie/LoadingAnimation.json')} autoPlay loop />
  </Box>
);

export default LoadingKYC;
