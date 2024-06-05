import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const SadFaceWithShadow = ({ width = 112, height = 112, strokeColor = '#D9261F' }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 112 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={56} cy={56} r={56} fill="#fff" fillOpacity={0.3} />
    <Circle cx={56} cy={56} r={46} fill="#fff" fillOpacity={0.4} />
    <Circle
      cx={56}
      cy={56}
      r={34}
      stroke={strokeColor}
      strokeLinecap="round"
      strokeDasharray="2 4 16 18"
    />
    <Path
      d="M72.497 39.55c9.263 9.263 9.1 24.383-.467 33.46-8.843 8.377-23.193 8.377-32.06 0-9.59-9.077-9.753-24.197-.466-33.46 9.1-9.123 23.893-9.123 32.993 0Z"
      fill="#D9261F"
    />
    <Circle cx={56} cy={56} r={11} stroke="#fff" strokeWidth={2} />
    <Circle cx={52} cy={53} r={2} fill="#fff" />
    <Circle cx={60} cy={53} r={2} fill="#fff" />
    <Path
      d="M60 60s-1-2-4-2-4 2-4 2"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SadFaceWithShadow;
