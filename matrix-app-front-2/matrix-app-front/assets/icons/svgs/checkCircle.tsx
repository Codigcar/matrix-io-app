import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CheckCircle = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"
      stroke="#3E9438"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.75 12l2.83 2.83 5.67-5.66"
      stroke="#3E9438"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckCircle;
