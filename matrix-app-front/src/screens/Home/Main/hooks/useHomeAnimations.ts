import { useCallback, useEffect } from 'react';
import {
  useAnimatedStyle, useSharedValue, withDelay, withTiming,
} from 'react-native-reanimated';

const ANIMATION_DURATION = 850;
const DELAY_CARDS_ANIMATION = 400;

function useHomeAnimations() {
  const opacity = useSharedValue(0);
  const bottom = useSharedValue(-100);
  const left = useSharedValue(-100);
  const right = useSharedValue(100);

  const startAnimation = useCallback(() => {
    opacity.value = withDelay(
      DELAY_CARDS_ANIMATION,
      withTiming(1, { duration: ANIMATION_DURATION }),
    );
    left.value = withDelay(DELAY_CARDS_ANIMATION, withTiming(0, { duration: ANIMATION_DURATION }));
    right.value = withDelay(DELAY_CARDS_ANIMATION, withTiming(0, { duration: ANIMATION_DURATION }));
    setTimeout(() => {
      bottom.value = withDelay(
        DELAY_CARDS_ANIMATION,
        withTiming(0, { duration: ANIMATION_DURATION }),
      );
    }, DELAY_CARDS_ANIMATION);
  }, [left, opacity, right, bottom]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);
  const creditInfoAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const transactionsAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: left.value }],
  }));
  const paymentsAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: left.value }],
  }));
  const cashbackAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: left.value }],
  }));
  const cardAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: right.value }],
  }));
  const settingCardAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: right.value }],
  }));
  const verifyEmailAnimation = useAnimatedStyle(() => ({
    zIndex: 20,
    transform: [{ translateY: bottom.value }],
  }));
  return {
    creditInfoAnimation,
    transactionsAnimation,
    paymentsAnimation,
    cashbackAnimation,
    cardAnimation,
    settingCardAnimation,
    verifyEmailAnimation,
  };
}

export default useHomeAnimations;
