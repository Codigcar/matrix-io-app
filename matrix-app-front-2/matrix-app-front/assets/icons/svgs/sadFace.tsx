import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const SadFace = ({ width, height, strokeColor }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M44.497 11.55c9.263 9.263 9.1 24.383-.467 33.46-8.843 8.377-23.193 8.377-32.06 0-9.59-9.077-9.753-24.197-.467-33.46 9.1-9.123 23.894-9.123 32.994 0z"
      fill={strokeColor || '#EA3323'}
    />
    <Circle cx={28} cy={28} r={11} stroke="#fff" strokeWidth={2} />
    <Circle cx={24} cy={25} r={2} fill="#fff" />
    <Circle cx={32} cy={25} r={2} fill="#fff" />
    <Path
      d="M32 32s-1-2-4-2-4 2-4 2"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SadFace;
