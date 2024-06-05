import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CardPos = ({ width, height,fill }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill ?? "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M3.93 15.88L15.88 3.93"
      stroke="url(#paint0_linear_4916_23906)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.101 18.279l1.2-1.2"
      stroke="url(#paint1_linear_4916_23906)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.793 15.589l2.39-2.39"
      stroke="url(#paint2_linear_4916_23906)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.601 10.239l6.64-6.64c2.12-2.12 3.18-2.13 5.28-.03l4.91 4.91c2.1 2.1 2.09 3.16-.03 5.28l-6.64 6.64c-2.12 2.12-3.18 2.13-5.28.03l-4.91-4.91c-2.1-2.1-2.1-3.15.03-5.28z"
      stroke="url(#paint3_linear_4916_23906)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 21.998h20"
      stroke="url(#paint4_linear_4916_23906)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_4916_23906"
        x1={3.92969}
        y1={9.9042}
        x2={15.8797}
        y2={9.9042}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_4916_23906"
        x1={11.1013}
        y1={17.679}
        x2={12.3013}
        y2={17.679}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_4916_23906"
        x1={13.793}
        y1={14.3937}
        x2={16.183}
        y2={14.3937}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_4916_23906"
        x1={2}
        y1={11.999}
        x2={21.9988}
        y2={11.999}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_4916_23906"
        x1={2}
        y1={22.4985}
        x2={22}
        y2={22.4985}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CardPos;
