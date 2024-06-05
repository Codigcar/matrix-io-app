import React, { memo, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styles from './styles';
import Box from '../box';

const Caret = memo(() => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const focusDuration = 500;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0,
          useNativeDriver: true,
          duration: focusDuration,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: focusDuration,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.caret, { opacity: opacityAnim }]}>
      <Box width={2} height={15} borderRadius={4} bg="primaryDarkest" />
    </Animated.View>
  );
});

export default Caret;
