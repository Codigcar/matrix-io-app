import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CardRectangle = ({ width = 4, height = 40 }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="40" height="40" rx="8" fill="#F0F1F5" />
    <Path
      d="M10 16.5049H30"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M14 24.5049H16"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M18.5 24.5049H22.5"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M14.44 11.5049H25.55C29.11 11.5049 30 12.3849 30 15.8949V24.1049C30 27.6149 29.11 28.4949 25.56 28.4949H14.44C10.89 28.5049 10 27.6249 10 24.1149V15.8949C10 12.3849 10.89 11.5049 14.44 11.5049Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default CardRectangle;
