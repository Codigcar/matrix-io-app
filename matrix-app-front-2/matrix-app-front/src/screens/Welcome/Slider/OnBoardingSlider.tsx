import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { Box, Text, TouchableOpacityBox } from 'matrix-ui-components';
import { hp, wp } from 'src/utils/sizes';
import { IntroSlider1, IntroSlider2, IntroSlider3 } from 'assets/svgs';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useOnboarding from './hooks/useOnboarding';
import Slider from './components/Slider';
import { SliderItemProps } from './components/SliderItem';

const slides: SliderItemProps[] = [
  {
    title: i18n.t('onboarding.first-slide.title'),
    text: i18n.t('onboarding.first-slide.text'),
    image: <IntroSlider1 />,
  },
  {
    title: i18n.t('onboarding.second-slide.title'),
    text: i18n.t('onboarding.second-slide.text'),
    image: <IntroSlider2 />,
  },
  {
    title: i18n.t('onboarding.third-slide.title'),
    text: i18n.t('onboarding.third-slide.text'),
    image: <IntroSlider3 />,
  },
];

const OnBoardingSlider: React.FC = () => {
  const { handleContinuePress } = useOnboarding();
  return (
    <BackgroundWrapper>
      <Box flex={1} alignItems="center" justifyContent="center" mb="spacing-custom-l">
        <Slider data={slides} />
      </Box>
      <Box position="absolute" right={wp(11)} top={hp(10)}>
        <TouchableOpacityBox onPress={handleContinuePress}>
          <Text variant="bodySemibold">{i18n.t('button-skip')}</Text>
        </TouchableOpacityBox>
      </Box>
    </BackgroundWrapper>
  );
};

export default OnBoardingSlider;
