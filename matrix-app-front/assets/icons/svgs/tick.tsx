import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Tick = ({ width, height, strokeColor }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M57.21 14.85c11.91 11.91 11.7 31.35-.6 43.02-11.37 10.77-29.82 10.77-41.22 0-12.33-11.67-12.54-31.11-.6-43.02 11.7-11.73 30.72-11.73 42.42 0z"
      fill="#fff"
    />
    <Path
      d="M23.25 36l8.49 8.49 17.01-16.98"
      stroke={strokeColor || '#1FAD36'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Tick;
