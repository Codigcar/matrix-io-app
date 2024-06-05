import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CheckWarning = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 70 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle
      cx={35}
      cy={35}
      r={34}
      stroke="#ED6625"
      strokeLinecap="round"
      strokeDasharray="2 4 16 18"
    />
    <Path
      d="M51.497 18.55c9.263 9.263 9.1 24.383-.467 33.46-8.843 8.377-23.193 8.377-32.06 0-9.59-9.077-9.753-24.197-.467-33.46 9.1-9.123 23.894-9.123 32.994 0z"
      fill="#ED6625"
    />
    <Path
      d="M34.794 28v9.589M34.794 41.794v.795"
      stroke="#fff"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

export default CheckWarning;
