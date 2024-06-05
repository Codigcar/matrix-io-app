import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Calendar = ({ width, height, strokeColor }: MtxSvgIconTypeProps) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M4 8h16M19 4H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1zM16 2v2M8 2v2"
      stroke="#0D1332"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Calendar;
