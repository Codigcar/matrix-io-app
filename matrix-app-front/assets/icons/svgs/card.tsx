import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Card = ({
  width, height, strokeColor, fill,
}: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    fill={fill ?? 'none'}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M6.44 3.50494H17.55C21.11 3.50494 22 4.38494 22 7.89494V16.1049C22 19.6149 21.11 20.4949 17.56 20.4949H6.44C2.89 20.5049 2 19.6249 2 16.1149V7.89494C2 4.38494 2.89 3.50494 6.44 3.50494Z" stroke={strokeColor || '#D1D4E0'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M2 8.50494H22" stroke={strokeColor || '#D1D4E0'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M6 16.5049H8" stroke={strokeColor || '#D1D4E0'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    <Path d="M10.5 16.5049H14.5" stroke={strokeColor || '#D1D4E0'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
  </Svg>
);

export default Card;
