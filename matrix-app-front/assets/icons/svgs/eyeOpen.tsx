import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const EyeOpen = ({ width, height, strokeColor="#545B7E" }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58z"
      stroke="url(#paint0_linear_4916_23888)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68z"
      stroke="url(#paint1_linear_4916_23888)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_4916_23888"
        x1={8.42}
        y1={12}
        x2={15.58}
        y2={12}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={strokeColor} />
        <Stop offset={1} stopColor={strokeColor} />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_4916_23888"
        x1={2.215}
        y1={11.995}
        x2={21.785}
        y2={11.995}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={strokeColor} />
        <Stop offset={1} stopColor={strokeColor} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default EyeOpen;
