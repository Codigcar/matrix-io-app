import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CardEdit = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1.996 8.5h9.5"
      stroke="url(#paint0_linear_5081_23447)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.996 16.5h2"
      stroke="url(#paint1_linear_5081_23447)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.496 16.5h4"
      stroke="url(#paint2_linear_5081_23447)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.996 12.03v4.08c0 3.51-.89 4.39-4.44 4.39H6.436c-3.55 0-4.44-.88-4.44-4.39V7.89c0-3.51.89-4.39 4.44-4.39H12"
      stroke="url(#paint3_linear_5081_23447)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.833 4.634v.733c0 .433.354.792.792.792.754 0 1.062.533.683 1.187a.791.791 0 00.292 1.08l.72.412c.33.196.755.079.95-.25l.046-.08c.38-.654.996-.654 1.371 0l.046.08c.196.329.62.446.95.25l.72-.413a.79.79 0 00.293-1.079c-.38-.654-.071-1.187.683-1.187a.794.794 0 00.791-.792v-.733a.794.794 0 00-.791-.792c-.754 0-1.063-.533-.684-1.188a.791.791 0 00-.291-1.079l-.721-.412a.695.695 0 00-.95.25l-.046.079c-.379.654-.996.654-1.37 0l-.047-.08a.695.695 0 00-.95-.25l-.72.413a.791.791 0 00-.292 1.08c.38.654.07 1.187-.683 1.187a.794.794 0 00-.792.792zM20 5a1 1 0 11-2 0 1 1 0 012 0z"
      fill="url(#paint4_linear_5081_23447)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_5081_23447"
        x1={1.99612}
        y1={9}
        x2={11.4961}
        y2={9}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_5081_23447"
        x1={5.99612}
        y1={17}
        x2={7.99612}
        y2={17}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_5081_23447"
        x1={10.4961}
        y1={17}
        x2={14.4961}
        y2={17}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_5081_23447"
        x1={1.99612}
        y1={12}
        x2={21.9961}
        y2={12}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_5081_23447"
        x1={14.833}
        y1={5.00026}
        x2={23.1705}
        y2={5.00026}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CardEdit;
