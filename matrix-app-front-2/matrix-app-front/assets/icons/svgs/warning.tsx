import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Warning = ({ width = 112, height = 112, strokeColor = '#ED6625' }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 112 112"
    fill="none"
  >
    <Circle cx="56" cy="56" r="56" fill="white" fill-opacity="0.3" />
    <Circle cx="56" cy="56" r="46" fill="white" fill-opacity="0.4" />
    <Circle cx="56" cy="56" r="34" stroke={strokeColor} stroke-linecap="round" stroke-dasharray="2 4 16 18" />
    <Path d="M72.4967 39.55C81.76 48.8134 81.5966 63.9333 72.03 73.0099C63.1866 81.3866 48.8366 81.3866 39.97 73.0099C30.38 63.9333 30.2166 48.8134 39.5033 39.55C48.6033 30.4267 63.3967 30.4267 72.4967 39.55Z" fill={strokeColor} />
    <Path d="M55.7944 49V58.5889" stroke="white" stroke-width="3" stroke-linecap="round" />
    <Path d="M55.7944 62.7944V63.5889" stroke="white" stroke-width="3" stroke-linecap="round" />
  </Svg>
);

export default Warning;
