/* eslint-disable global-require */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { ImageBackground, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Assets
import { Background } from 'assets/images';
// Styles
import Styles from './styles/MtxWrapperStyles';

type MtxWrapperPropsType = {
  children: JSX.Element;
  isDark?: boolean;
  isThird?: boolean;
};

// eslint-disable-next-line react/prefer-exact-props
const MtxWrapper = (props: MtxWrapperPropsType) => {
  const { children, isDark, isThird } = props;
  return (
    <LinearGradient
      start={Styles.start}
      end={Styles.end}
      style={Styles.container}
      colors={
        isDark
          ? Styles.darkColors
          : isThird
          ? Styles.thirdColors
          : Styles.lightColors
      }
    >
      <ImageBackground
        source={Background}
        style={Styles.imageBackground}
        resizeMode="stretch"
      >
        {children}
      </ImageBackground>
    </LinearGradient>
  );
};

export default MtxWrapper;

MtxWrapper.defaultProps = {
  isDark: false,
  isThird: false,
};
