import { useState, useEffect } from 'react';
import { Animated, Keyboard, KeyboardEvent } from 'react-native';

const ANIMATION_TIME = 300;

const useKeyboardPosition = () => {
  const [viewHeightMarginTop] = useState(new Animated.Value(0));
  const spacingCloseKeyboard = 0;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event: KeyboardEvent) => {
        const spacingOpenKeyboard = -event.endCoordinates.height;
        Animated.timing(viewHeightMarginTop, {
          toValue: spacingOpenKeyboard,
          duration: ANIMATION_TIME,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(viewHeightMarginTop, {
          toValue: spacingCloseKeyboard,
          duration: ANIMATION_TIME,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [viewHeightMarginTop]);

  return viewHeightMarginTop;
};

export default useKeyboardPosition;
