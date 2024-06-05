import React from 'react';
import { Box } from 'matrix-ui-components';
import AnimatedLottieView from 'lottie-react-native';
import { LoadingAnimation } from 'assets/lottie';

const ReloadLoading = () => (
  <Box
    position="absolute"
    bottom={25}
    width="100%"
    alignItems="center"
    alignContent="center"
  >
    <Box
      height={40}
      width={40}
      backgroundColor="primaryDark"
      borderRadius={50}
      borderColor="primaryDark"
      borderWidth={1}
      overflow="hidden"
      shadowColor="black"
      shadowRadius={10}
      shadowOpacity={1}
      elevation={5}
    >
      <AnimatedLottieView
        source={LoadingAnimation}
        autoPlay
        loop
        style={{ marginHorizontal: 4 }}
      />
    </Box>
  </Box>
);

export default ReloadLoading;
