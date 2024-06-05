// eslint-disable-next-line react/prefer-exact-props
/* eslint-disable no-nested-ternary */
import React from 'react';
import { ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// Assets
import { HomeBackground } from 'assets/images';
// Styles
import Styles from './styles/MtxWrapperStyles';

type MtxHomeWrapperPropsType = {
  children: JSX.Element;
};

const start = { x: 0.0, y: 1.0 };
const end = { x: 1.0, y: 0.0 };
const gradientColors = ['#DDDEE4', '#FAFAFB'];

const MtxHomeWrapper = ({ children }: MtxHomeWrapperPropsType) => (
  <LinearGradient
    start={start}
    end={end}
    style={Styles.container}
    colors={gradientColors}
  >
    <ImageBackground
      source={HomeBackground}
      style={Styles.imageBackground}
      resizeMode="stretch"
    >
      {children}
    </ImageBackground>
  </LinearGradient>
);

export default MtxHomeWrapper;
