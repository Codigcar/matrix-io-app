import React, {useCallback, useEffect} from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FC, useState} from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {NavParams} from '../navigation/types';
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  useSharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Gesture} from 'react-native-gesture-handler';
import {useVector} from 'react-native-redash';

const DOUBLE_TAP_SCALE = 3;
const MAX_SCALE = 6;
const SPACE_BETWEEN_IMAGES = 40;
const rtl = I18nManager.isRTL;

export const CGallery = ({data, initialIndex, ref}: any) => {
  const [index, setIndex] = useState(initialIndex);
  const currentIndex = useSharedValue(initialIndex);

  const {top, bottom} = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const initialTranslateX = useSharedValue(0);
  const emptySpaceWidth = SPACE_BETWEEN_IMAGES;
  const windowDimensions = useWindowDimensions();
  //   const dimensions = containerDimensions || windowDimensions;
  const dimensions = windowDimensions;
  const {width} = dimensions;
  const translateX = useSharedValue(
    initialIndex * -(dimensions.width + emptySpaceWidth),
  );
  const offset = useVector(0, 0);
  const layout = useVector(dimensions.width, 0);

  //   const changeIndex = useCallback(
  //     (newIndex: number) => {
  //       onIndexChange?.(newIndex);
  //       setIndex(newIndex);
  //     },
  //     [onIndexChange, setIndex],
  //   );

  // const getEdgeX = () => {
  //   'worklet';
  //   const newWidth = scale.value * layout.x.value;

  //   const point = (newWidth - dimensions.width) / 2;

  //   if (point < 0 || isNaN(point)) {
  //     return [-0, 0];
  //   }

  //   return [-point, point];
  // };

  // const clamp = (value: number, min: number, max: number) => {
  //   return Math.max(Math.min(value, max), min);
  // };

  // const withRubberBandClamp = (
  //   x: number,
  //   coeff: number,
  //   dim: number,
  //   limits: [number, number],
  // ) => {
  //   'worklet';
  //   let clampedX = clamp(x, limits[0], limits[1]);
  //   let diff = Math.abs(x - clampedX);
  //   let sign = clampedX > x ? -1 : 1;

  //   return clampedX + sign * rubberBandClamp(diff, coeff, dim);
  // };

  // const getPosition = (i?: number) => {
  //   return -(width + emptySpaceWidth) * (typeof i !== 'undefined' ? i : index);
  // };

  // const translation = useVector(0, 0);

  // const panGesture = Gesture.Pan()
  //   .minDistance(10)
  //   .maxPointers(1)
  //   .onBegin(() => {})
  //   .onStart(({velocityY, velocityX}) => {
  //     initialTranslateX.value = translateX.value;
  //   })
  //   .onUpdate(({translationX, translationY, velocityY}) => {
  //     'worklet';
  //   })
  //   .onEnd(({velocityX, velocityY}) => {
  //     'worklet';
  //     const edgeX = getEdgeX();

  //     if (
  //       Math.abs(translateX.value - getPosition()) >= 0 &&
  //       edgeX.some(x => x === translation.x.value + offset.x.value)
  //     ) {
  //       let snapPoints = [index - 1, index, index + 1]
  //         .filter((_, y) => {
  //           if (loop) return true;

  //           if (y === 0) {
  //             return !isFirst;
  //           }
  //           if (y === 2) {
  //             return !isLast;
  //           }
  //           return true;
  //         })
  //         .map(i => getPosition(i));

  //       if (disableTransitionOnScaledImage && scale.value > 1) {
  //         snapPoints = [getPosition(index)];
  //       }

  //       let snapTo = snapPoint(
  //         translateX.value,
  //         rtl ? -velocityX : velocityX,
  //         snapPoints,
  //       );

  //       const nextIndex = getIndexFromPosition(snapTo);

  //       if (currentIndex.value !== nextIndex) {
  //         if (loop) {
  //           if (nextIndex === length) {
  //             currentIndex.value = 0;
  //             translateX.value = translateX.value - getPosition(length);
  //             snapTo = 0;
  //           } else if (nextIndex === -1) {
  //             currentIndex.value = length - 1;
  //             translateX.value = translateX.value + getPosition(length);
  //             snapTo = getPosition(length - 1);
  //           } else {
  //             currentIndex.value = nextIndex;
  //           }
  //         } else {
  //           currentIndex.value = nextIndex;
  //         }
  //       }

  //       translateX.value = withSpring(snapTo, springConfig);
  //     } else {
  //     }
  //   });

  // const onIndexChange = useCallback(
  //   (index: number) => {
  //     setParams({index});
  //   },
  //   [isFocused, setParams],
  // );

  useEffect(() => {
    // setParams({initialIndex = index});
  }, [index]);

  return (
    <View>
      {true && (
        <Animated.View
          entering={true ? FadeInUp.duration(250) : undefined}
          exiting={FadeOutUp.duration(250)}
          style={[
            styles.toolbar,
            {
              height: top + 60,
              paddingTop: top,
            },
          ]}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              {index + 1} of {data.length}
            </Text>
          </View>
        </Animated.View>
      )}
      <Image
        source={{uri: data[index]}}
        height="100%"
        width="100%"
        // onLoad={(e: any) => {

        // }}
      />
      {true && (
        <Animated.View
          entering={true ? FadeInDown.duration(250) : undefined}
          exiting={FadeOutDown.duration(250)}
          style={[
            styles.toolbar,
            styles.bottomToolBar,
            {
              height: bottom + 100,
              paddingBottom: bottom,
            },
          ]}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                setIndex((before: number) =>
                  before === 0 ? data.length - 1 : before - 1,
                );
              }}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => {
                setIndex((before: number) =>
                  before === data.length - 1 ? 0 : before + 1,
                );
              }}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolbar: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  bottomToolBar: {
    bottom: 0,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
