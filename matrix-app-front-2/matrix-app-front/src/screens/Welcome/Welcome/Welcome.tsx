import React, { useEffect, useState } from 'react';
import { Box } from 'matrix-ui-components';
import { wp } from 'src/utils/sizes';
import { Animated } from 'react-native';
import WelcomeCardBottom from 'assets/svgs/TarjetaBottom.svg';
import WelcomeCardTop from 'assets/svgs/TarjetaTop.svg';
import styles from './styles/styles';

type WelcomeProps = {
  onEndAnimation?: () => void;
};

const Welcome: React.FC<WelcomeProps> = ({ onEndAnimation }) => {
  const slideTop = useState(new Animated.Value(0))[0];
  const slideBottom = useState(new Animated.Value(0))[0];

  const slideInAnimation = () => {
    Animated.parallel([
      Animated.timing(slideBottom, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(slideTop, {
        toValue: 400,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const slideOutAnimation = () => {
    Animated.parallel([
      Animated.timing(slideTop, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(slideBottom, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(onEndAnimation);
  };

  useEffect(() => {
    slideInAnimation();
    setTimeout(slideOutAnimation, 1400);
  }, []);

  return (
    <Box mb="spacing-xxxxxs" mt="spacing-m" height={407}>
      <Animated.View
        style={{
          marginLeft: slideBottom,
        }}
      >
        <Box mt="spacing-l" style={styles.imageBottom}>
          <WelcomeCardBottom width={wp(100)} />
        </Box>
      </Animated.View>
      <Animated.View
        style={{
          marginRight: slideTop,
        }}
      >
        <Box mt="spacing-xxxxxs" style={styles.imageTop}>
          <WelcomeCardTop width={wp(100)} />
        </Box>
      </Animated.View>
    </Box>
  );
};

export default Welcome;

Welcome.defaultProps = {
  onEndAnimation: undefined,
};
