import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Receipt = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.73 19.7c.82-.88 2.07-.81 2.79.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V7.04C20.5 3.01 19.56 2 15.78 2H8.22C4.44 2 3.5 3.01 3.5 7.04V18.3c0 2.67 1.46 3.29 3.23 1.4z"
      stroke="url(#paint0_linear_5081_23465)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 7h8"
      stroke="url(#paint1_linear_5081_23465)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11h6"
      stroke="url(#paint2_linear_5081_23465)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_5081_23465"
        x1={3.5}
        y1={12.0013}
        x2={20.4901}
        y2={12.0013}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_5081_23465"
        x1={8}
        y1={7.5}
        x2={16}
        y2={7.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_5081_23465"
        x1={9}
        y1={11.5}
        x2={15}
        y2={11.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Receipt;
