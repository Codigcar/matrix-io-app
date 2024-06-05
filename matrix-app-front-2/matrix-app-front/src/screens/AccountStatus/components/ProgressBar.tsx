import { Box } from 'matrix-ui-components';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Styles from '../styles/progressBarStyles';
import { ProgressBarComponentProps } from '../types/types';

const ProgressBar = ({ percent }: ProgressBarComponentProps) => {
  const animationWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationWidth, {
      duration: 1000,
      toValue: percent || 0,
      easing: Easing.quad,
      useNativeDriver: false,
    }).start();
  }, [animationWidth, percent]);

  const widthPercentInterpolate = animationWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  return (
    <Box
      bg="feedbackInformativeLightest"
      width="100%"
      height={5}
      borderRadius={5}
      testID="progressBarValue"
    >
      <Animated.View style={[Styles.default, {
        width: widthPercentInterpolate,
      }]}
      />
    </Box>
  );
};

export default ProgressBar;
