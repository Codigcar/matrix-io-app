import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Calendar = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M8 2v3"
      stroke="url(#paint0_linear_5251_782)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 2v3"
      stroke="url(#paint1_linear_5251_782)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.5 9.09h17"
      stroke="url(#paint2_linear_5251_782)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z"
      stroke="url(#paint3_linear_5251_782)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.995 13.7h.01"
      stroke="url(#paint4_linear_5251_782)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.294 13.7h.01"
      stroke="url(#paint5_linear_5251_782)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.294 16.7h.01"
      stroke="url(#paint6_linear_5251_782)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_5251_782"
        x1={8}
        y1={3.5}
        x2={9}
        y2={3.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_5251_782"
        x1={16}
        y1={3.5}
        x2={17}
        y2={3.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_5251_782"
        x1={3.5}
        y1={9.58997}
        x2={20.5}
        y2={9.58997}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_5251_782"
        x1={3}
        y1={12.75}
        x2={21}
        y2={12.75}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_5251_782"
        x1={11.501}
        y1={13.7}
        x2={12.499}
        y2={13.7}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint5_linear_5251_782"
        x1={7.7998}
        y1={13.7}
        x2={8.7978}
        y2={13.7}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint6_linear_5251_782"
        x1={7.7998}
        y1={16.7}
        x2={8.7978}
        y2={16.7}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Calendar;
