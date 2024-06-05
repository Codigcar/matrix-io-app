import * as React from 'react';
import Svg, {
  Mask, Rect, G, Path, Defs, LinearGradient, Stop,
} from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CardLiquidDark = ({
  width = 167, height = 349, x = 0, y = 0,
}: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 167 176"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
  >
    <Mask
      id="a"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={230}
      height={349}
    >
      <Rect width={230} height={349} rx={24} fill="#fff" />
      <Rect width={230} height={349} rx={24} fill="url(#paint0_linear_14575_43829)" />
    </Mask>
    <G mask="url(#a)">
      <Path fill="url(#paint1_linear_14575_43829)" d="M0 0H230V349H0z" />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_14575_43829"
        x1={11.5}
        y1={43}
        x2={203.5}
        y2={161.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.215201} stopColor="#3C415E" />
        <Stop offset={0.438458} stopColor="#394263" />
        <Stop offset={1} stopColor="#4A5A7E" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_14575_43829"
        x1={79.26}
        y1={342.352}
        x2={12.9305}
        y2={2.15826}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#0D1332" />
        <Stop offset={1} stopColor="#545B7E" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CardLiquidDark;
