import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const LoadingIndicator = ({ width, height, strokeColor = '#FFF' }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect x={0.932617} y={3} width={6} height={22} rx={3} fill={strokeColor} />
    <Rect x={0.932617} y={3} width={6} height={22} rx={3} fill={strokeColor} />
    <Rect x={11.9326} y={2} width={6} height={24} rx={3} fill={strokeColor} />
    <Rect x={11.9326} y={2} width={6} height={24} rx={3} fill={strokeColor} />
    <Rect x={22.9326} y={6} width={6} height={16} rx={3} fill={strokeColor} />
    <Rect x={22.9326} y={6} width={6} height={16} rx={3} fill={strokeColor} />
    <Rect x={33.9326} width={6} height={28} rx={3} fill={strokeColor} />
    <Rect x={33.9326} width={6} height={28} rx={3} fill={strokeColor} />
  </Svg>
);

export default LoadingIndicator;
