import { useEffect } from 'react';
import Animated, { useAnimatedProps, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const AnimatedSVG = Animated.createAnimatedComponent(Svg);

const Loading = () => {

  const opacity = useSharedValue(1);

  const animatedProps = useAnimatedProps(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, { duration: 1000 }),-1,true);
  }, []);

  return (
    <AnimatedSVG width={77} height={48} fill="none" animatedProps={animatedProps}>
      <Path
        fill="url(#a)"
        fillRule="evenodd"
        d="m42.41 15.469-.002.001-.232.271c-4.493 5.249-3.814 13.568 1.713 18.251 5.61 4.75 14.052 4.038 18.767-1.615l3.206 2.64-3.205-2.64c4.538-5.44 3.886-13.597-1.461-18.254l2.74-3.106-2.74 3.106C55.635 9.28 47.187 9.9 42.408 15.469Zm-6.215-5.492C44 1.027 57.673.067 66.677 7.91c8.735 7.608 9.793 20.857 2.382 29.74-7.682 9.208-21.436 10.362-30.567 2.63v-.001c-8.89-7.532-10.22-21.028-2.67-29.87l.15-.178.076-.09c.047-.056.096-.111.145-.164Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M41.933 9.666a4.112 4.112 0 0 1 .474 5.823L30.94 28.884 19.456 42.3c-5.318 6.215-15.548 2.48-15.548-5.678v-15.31c0-2.282 1.862-4.132 4.159-4.132 2.296 0 4.158 1.85 4.158 4.131v15.311c0 .187.048.26.075.296.042.057.127.13.257.178.13.048.243.047.313.03.044-.01.128-.035.25-.177l3.168 2.676-3.168-2.676 11.485-13.417L36.07 10.136a4.178 4.178 0 0 1 5.862-.47Z"
        clipRule="evenodd"
      />
      <Path
        fill="url(#b)"
        fillRule="evenodd"
        d="m69.34 37.307-6.746-4.855c-4.727 5.584-13.12 6.27-18.705 1.54-5.527-4.683-6.206-13.002-1.713-18.25l.034-.04c.037-.046.075-.09.114-.136a4.112 4.112 0 0 0-.475-5.823 4.177 4.177 0 0 0-5.862.472l-.164.194c-7.55 8.842-6.22 22.339 2.67 29.87 9.131 7.733 22.885 6.579 30.567-2.63a21.4 21.4 0 0 0 .28-.342Z"
        clipRule="evenodd"
      />
      <Path
        fill="url(#c)"
        fillRule="evenodd"
        d="M66.678 7.91a4.178 4.178 0 0 0-5.868.383 4.112 4.112 0 0 0 .386 5.829c5.347 4.657 6 12.815 1.46 18.254l3.202 2.637-3.202-2.636c-4.715 5.652-13.158 6.364-18.767 1.615-5.527-4.684-6.206-13.003-1.713-18.252l.034-.04a15.487 15.487 0 0 1 .114-.135 4.112 4.112 0 0 0-.475-5.823 4.177 4.177 0 0 0-5.862.472l-.164.194c-7.55 8.842-6.22 22.339 2.67 29.87 9.131 7.733 22.885 6.58 30.567-2.63 7.411-8.882 6.353-22.131-2.382-29.738Z"
        clipRule="evenodd"
      />
      <Path
        fill="#fff"
        d="M8.058 13.45c3.009 0 5.448-2.423 5.448-5.413s-2.439-5.413-5.448-5.413c-3.01 0-5.449 2.424-5.449 5.413 0 2.99 2.44 5.413 5.449 5.413Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={60.694}
          x2={64.781}
          y1={9.222}
          y2={45.414}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#78CFDE" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={33.605}
          x2={50.092}
          y1={10.378}
          y2={41.594}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#5672C8" />
          <Stop offset={0.521} stopColor="#5AB0C4" />
          <Stop offset={1} stopColor="#80C2D2" />
          <Stop offset={1} stopColor="#B4DBE4" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="c"
          x1={65.864}
          x2={50.743}
          y1={15.242}
          y2={49.505}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={0.758} stopColor="#5AB0C4" />
          <Stop offset={1} stopColor="#5AB0C4" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </AnimatedSVG>
  )
}

export default Loading;
