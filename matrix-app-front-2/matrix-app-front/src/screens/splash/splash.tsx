import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { Text, Box } from 'matrix-ui-components';
import SplashJSON from 'assets/lottie/splash.json';
import LottieView from 'lottie-react-native';
import { getAppVersion } from 'src/utils/seed/deviceInfo';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { SPLASH_ANIMATION_DURATION } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import { LogoBCP } from 'assets/svgs';

const SplashScreen: React.FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const [appVersion, setAppVersion] = useState<string>();

  const startFadeAnimation = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: SPLASH_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    getAppVersion().then(setAppVersion);
    startFadeAnimation();
  }, []);

  return (
    <BackgroundWrapper>
      <Box justifyContent="center" alignItems="center" flex={1}>
        <LottieView source={SplashJSON} loop={false} autoPlay />
        <Box position="absolute" bottom={50} alignItems="center">
          <Text variant="body13pxRegular" color="primary700">
            {i18n.t('splash-credits')}
          </Text>
          <Box mt="spacing-xxs" mb="spacing-sm">
            <LogoBCP />
          </Box>
          {appVersion && (
            <Text variant="body13pxRegular" color="primary700">{`v${appVersion}`}</Text>
          )}
        </Box>
      </Box>
    </BackgroundWrapper>
  );
};

export default SplashScreen;
