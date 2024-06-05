import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Notification = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12.02 2.91c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 15.77c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.91c0-3.3-2.7-6-6-6z"
      stroke="url(#paint0_linear_5081_23381)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M13.87 3.2a6.754 6.754 0 00-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26z"
      stroke="url(#paint1_linear_5081_23381)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.02 19.06c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 01-.88-2.12"
      stroke="url(#paint2_linear_5081_23381)"
      strokeWidth={1.5}
      strokeMiterlimit={10}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_5081_23381"
        x1={3.97403}
        y1={11.345}
        x2={20.0165}
        y2={11.345}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_5081_23381"
        x1={10.17}
        y1={2.56994}
        x2={13.87}
        y2={2.56994}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_5081_23381"
        x1={9.01999}
        y1={20.5601}
        x2={15.02}
        y2={20.5601}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#545B7E" />
        <Stop offset={1} stopColor="#979DBA" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Notification;
