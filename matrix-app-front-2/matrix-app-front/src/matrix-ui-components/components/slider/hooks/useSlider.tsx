import { useState, useRef, useEffect } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ios, screenWidth } from 'src/utils/constants';

const useSlider = (listItems: any) => {
  const lengthItems = listItems.length;
  const dotWidth = EStyleSheet.value('29rem');
  const marginWidth = EStyleSheet.value('4rem');
  const carouselRef = useRef(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [positionCheck, setPositionCheck] = useState({ position: 0, value: 0 });
  const isFirstRender = useRef(true);
  const leftPosition = useSharedValue(screenWidth / 2 - (dotWidth + marginWidth + 3) * 2);

  const start = { x: 0, y: 0 };
  const end = { x: 1, y: 0 };
  const style = {
    flex: 1,
    width: screenWidth,
  };

  const gradientColor = [
    'rgba(255,255,255,1)',
    'rgba(255,255,255,0.8)',
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0.8)',
    'rgba(255,255,255,1)',
  ];

  const startMovingLeft = (newLeft: number) => {
    leftPosition.value = withTiming(newLeft, { duration: 500 });
  };
  const animatedStyle = useAnimatedStyle(() => ({
    left: leftPosition.value,
  }));

  const handlerOnScrollIndexChanged = (index: number) => {
    if (ios) {
      if (index === activeSlide + 1 || index === activeSlide - 1) {
        setScrollEnabled(false);
        carouselRef?.current?.snapToItem(index, true, false, false);
        setActiveSlide(index);
        setTimeout(() => {
          setScrollEnabled(true);
        }, 15);
      }
    } else {
      setActiveSlide(index);
    }
  };

  useEffect(() => {
    if (lengthItems === 2) startMovingLeft(screenWidth / 2 - (dotWidth + marginWidth + 3) * 1.5);
    if (lengthItems >= 3) startMovingLeft(screenWidth / 2 - (dotWidth + marginWidth + 3) * 2);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (lengthItems > 3) {
      const isSlideLessThanValue = activeSlide < positionCheck.value;
      const newActiveSlide = isSlideLessThanValue ? activeSlide + 1 : activeSlide;

      const newPosition = isSlideLessThanValue
        ? positionCheck.position - 1
        : positionCheck.position + 1;

      setPositionCheck({ position: Math.max(0, Math.min(newPosition, 2)), value: activeSlide });

      if (positionCheck.position === 0 && isSlideLessThanValue) {
        startMovingLeft(screenWidth / 2 - (dotWidth + marginWidth + 3) * (newActiveSlide + 1));
      }

      if (positionCheck.position === 2 && !isSlideLessThanValue) {
        startMovingLeft(screenWidth / 2 - (dotWidth + marginWidth + 3) * newActiveSlide + 1);
      }
    }
  }, [activeSlide]);

  return {
    carouselRef,
    activeSlide,
    setActiveSlide,
    scrollEnabled,
    leftPosition,
    startMovingLeft,
    animatedStyle,
    handlerOnScrollIndexChanged,
    start,
    end,
    style,
    gradientColor,
    positionCheck,
    isFirstRender,
    setScrollEnabled,
  };
};

export default useSlider;
