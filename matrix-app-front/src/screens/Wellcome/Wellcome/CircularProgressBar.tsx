/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Text, Box, colors } from 'matrix-ui-components';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';

interface CircularProgrssBarProps {
  percent: number;
  size?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = ({
  percent = 0,
  size = 70,
}: CircularProgrssBarProps) => {
  const value = percent > 100 ? 100 : percent;
  const progress = useSharedValue(0);
  const SIZE = RFValue(size);
  const RADIUS = SIZE / 2.5;
  const HALF_SIZE = SIZE / 2;
  const CIRCLE_LENGTH = RADIUS * (2 * Math.PI);

  useEffect(() => {
    progress.value = withSpring(value, { damping: 100 });
  }, [value]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (-progress.value * 0.01 - 1),
  }));

  return (
    <Box width={SIZE} height={SIZE} alignItems="center" justifyContent="center">
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
        <Circle
          cx={HALF_SIZE}
          cy={HALF_SIZE}
          r={RADIUS}
          stroke={colors.complementaryIndigo100}
          strokeWidth={6}
        />
        <AnimatedCircle
          origin={HALF_SIZE}
          cx={HALF_SIZE}
          cy={HALF_SIZE}
          r={RADIUS}
          stroke="url(#gradient)"
          strokeLinecap="round"
          strokeWidth={6}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          rotation={-90}
        />
        <Defs>
          <LinearGradient
            id="gradient"
            x1={35}
            y1={48.8571}
            x2={85.5164}
            y2={35.0121}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#758CD2" />
            <Stop offset={1} stopColor="#78BECE" />
          </LinearGradient>
        </Defs>
      </Svg>
      <Box position="absolute">
        <Text variant="Subtitle18Medium">{`${value}%`}</Text>
      </Box>
    </Box>
  );
};

CircularProgressBar.defaultProps = {
  size: 70,
};

export default CircularProgressBar;
