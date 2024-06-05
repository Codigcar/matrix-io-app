import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const ForeignRectangle = ({ width = 4, height = 40 }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="40" height="40" rx="8" fill="#F0F1F5" />
    <Path
      d="M10 23.2V17C10 13.5 12 12 15 12H25C28 12 30 13.5 30 17V23C30 26.5 28 28 25 28H16.5"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20C22.5 18.6193 21.3807 17.5 20 17.5C18.6193 17.5 17.5 18.6193 17.5 20C17.5 21.3807 18.6193 22.5 20 22.5Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M26.5 17.5V22.5"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17 26C17 26.75 16.79 27.46 16.42 28.06C15.73 29.22 14.46 30 13 30C11.54 30 10.27 29.22 9.58002 28.06C9.21002 27.46 9 26.75 9 26C9 23.79 10.79 22 13 22C15.21 22 17 23.79 17 26Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M15.75 23.25L10.25 28.75"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default ForeignRectangle;
