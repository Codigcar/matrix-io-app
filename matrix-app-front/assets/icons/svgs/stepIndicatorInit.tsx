import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const StepIndicatorInit = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 339 339"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle
      cx={169.5}
      cy={169.5}
      r={167.5}
      stroke="#fff"
      strokeWidth={3}
      strokeLinejoin="round"
      strokeDasharray="1 8 1 8"
    />
  </Svg>
);

export default StepIndicatorInit;
