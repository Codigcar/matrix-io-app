import {
  Box, Button, Divider, Modal, Text, theme,
} from 'matrix-ui-components';
import React, { useCallback, useEffect } from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import misteryBoxGift from 'assets/lottie/MisteryBoxGift.json';
import LottieView from 'lottie-react-native';
import { screenHeight } from 'src/utils/constants';
import { hp, wp } from 'src/utils/sizes';
import Animated, {
  ZoomIn, useAnimatedStyle, useSharedValue, withDelay, withTiming,
} from 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player';
import sound from 'assets/sound/surprise_box_sound.wav';
import useMysteryBoxData from './hooks/useMysteryBoxData';

const AnimatedBox = Animated.createAnimatedComponent(Box);
const DELAY_APPEAR_SURPRISE = 600;
const STARTING_POSITION_SURPRISE = 180;
const DURATION_SURPRISE = 1500;
const DELAY_SURPRISE = 100;
const DELAY_APPEAR_CARD = 1500;
const DURATION_CARD = 800;
const DELAY_CARD = 800;
const DURATION_OPACITY_CARD = 1400;

export const MisteryBox = () => {
  const { gift, showMysteryBox, closeMysteryBox } = useMysteryBoxData();
  const topBoxLottie = (screenHeight / 4) - hp(17);
  const SLIDE_UP = useSharedValue(STARTING_POSITION_SURPRISE);
  const OPACITY_SURPRISE_BOX = useSharedValue(0);
  const OPACITY_CARD = useSharedValue(0);

  const start = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'surprise_box_sound',
      url: sound,
    });
    await TrackPlayer.play();
  };

  const startFadeAnimation = useCallback(() => {
    OPACITY_SURPRISE_BOX.value = withDelay(DELAY_APPEAR_SURPRISE, withTiming(1, { duration: 250 }));
    SLIDE_UP.value = withDelay(
      DELAY_SURPRISE,
      withTiming(1, { duration: DURATION_SURPRISE }),
    );
  }, [OPACITY_SURPRISE_BOX, SLIDE_UP]);

  const changeOpacity = useCallback(() => {
    OPACITY_CARD.value = withDelay(
      DELAY_APPEAR_CARD,
      withTiming(1, { duration: DURATION_OPACITY_CARD }),
    );
  }, [OPACITY_CARD]);

  useEffect(() => {
    if (showMysteryBox) {
      startFadeAnimation();
      changeOpacity();
      setTimeout(() => {
        start();
      }, 1000);
    }
  }, [changeOpacity, showMysteryBox, startFadeAnimation]);

  const viewStyles = useAnimatedStyle(() => ({
    top: topBoxLottie,
    position: 'absolute',
    zIndex: 1,
    opacity: OPACITY_SURPRISE_BOX.value,
    transform: [
      {
        translateY: SLIDE_UP.value,
      },
    ],
  }));

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: OPACITY_CARD.value,
  }));

  return (
    <Modal animationType="fade" transparent visible={showMysteryBox} onRequestClose={closeMysteryBox}>
      <Box alignItems="center" backgroundColor="modalBlackWithOpacity" flex={1} justifyContent="center">
        <Animated.View style={viewStyles}>
          <Box width={wp(90)} height={hp(50)}>
            <LottieView source={misteryBoxGift} autoPlay loop resizeMode="cover" />
          </Box>
        </Animated.View>
        <AnimatedBox
          style={animatedOpacityStyle}
          entering={ZoomIn.duration(DURATION_CARD).delay(DELAY_CARD)}
          bg="white"
          paddingHorizontal="spacing-m"
          paddingVertical="spacing-xxs"
          borderRadius={30}
          alignItems="center"
          justifyContent="center"
          margin="spacing-m"
          marginTop="spacing-xl"
        >
          <Box mt="spacing-l">
            <Text style={theme.textVariants.mysteryBox.title} textAlign="center" margin="spacing-xxxs">
              {gift?.title}
            </Text>
            <Divider height={16} />
            <Text textAlign="center" paddingHorizontal="spacing-xxs">
              <Text paddingHorizontal="spacing-l" style={theme.textVariants.mysteryBox.subTitle} fontWeight="600">
                {`${i18n.t('mistery-box.message-your-gift')}\n`}
              </Text>
              <Text style={theme.textVariants.mysteryBox.label} fontWeight="400">
                {`${gift?.description}\n\n`}
              </Text>
              <Text style={theme.textVariants.mysteryBox.label} fontWeight="400">
                {i18n.t('mistery-box.message-email')}
              </Text>
            </Text>
            <Divider height={hp(2)} />
            <Button
              my="spacing-s"
              paddingHorizontal="spacing-xxxxs"
              onPress={closeMysteryBox}
              label={i18n.t('mistery-box.close')}
            />
          </Box>
        </AnimatedBox>
      </Box>
    </Modal>
  );
};

MisteryBox.name = 'MisteryBox';

export default MisteryBox;
