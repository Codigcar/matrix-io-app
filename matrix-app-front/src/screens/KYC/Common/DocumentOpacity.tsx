import React, { useEffect } from 'react';
import { Box } from 'matrix-ui-components';
import { ImageSourcePropType } from 'react-native';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import RectangleFocus from 'assets/svgs/rectangle_focus.svg';
import RectangleSuccess from 'assets/svgs/rectangle_success.svg';

interface DocumentOpacityProps {
  cameraReady: Boolean;
  image: ImageSourcePropType | Reanimated.Node<ImageSourcePropType>;
}

const ANIMATION_DURATION = 1000;
const IMAGE_HEIGHT = 218;
const IMAGE_WIDTH = 328;
const PADDING = RFValue(20);
const BORDER_WIDTH = RFValue(6);
const STATUSBAR_HEIGHT = 20;

export const DocumentOpacity = ({ image, cameraReady }: DocumentOpacityProps) => {
  const documentImageOpacity = useSharedValue(1);
  const animationStyle = useAnimatedStyle(() => ({
    opacity: documentImageOpacity.value,
  }));

  useEffect(() => {
    setTimeout(() => {
      documentImageOpacity.value = withTiming(0, {
        duration: ANIMATION_DURATION,
      });
    }, 300);
  }, [documentImageOpacity]);

  return (
    <Box
      top={STATUSBAR_HEIGHT + PADDING}
      height={IMAGE_HEIGHT + PADDING}
      width={IMAGE_WIDTH + PADDING}
      justifyContent={'center'}
      alignItems={'center'}
      alignSelf={'center'}
    >
      {cameraReady ? <RectangleSuccess
        width={IMAGE_WIDTH + PADDING}
        height={IMAGE_HEIGHT + PADDING} />
        :
        <RectangleFocus
          width={IMAGE_WIDTH + PADDING}
          height={IMAGE_HEIGHT + PADDING} />
      }

      {/* Styles are necessary for the animation  */}
      <Reanimated.Image
        source={image}
        style={[
          {
            width: IMAGE_WIDTH - BORDER_WIDTH,
            height: IMAGE_HEIGHT,
            position: 'absolute',
            borderWidth: BORDER_WIDTH,
            borderColor: 'white',
            borderRadius: RFValue(12),
          },
          animationStyle,
        ]}
        resizeMode="stretch"
      />
    </Box>
  );
};
