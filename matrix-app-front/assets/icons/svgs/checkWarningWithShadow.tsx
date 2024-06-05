import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const CheckWarningWithShadow = ({ width = 112, height = 112 }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 112 112"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Circle cx={56} cy={56} r={56} fill="white" fillOpacity={0.3} />
    <Circle cx={56} cy={56} r={46} fill="white" fillOpacity={0.4} />
    <Circle
      cx={56}
      cy={56}
      r={34}
      stroke="#ED6625"
      strokeLinecap="round"
      strokeDasharray="2 4 16 18"
    />
    <Path
      d="M72.497 39.55C81.7603 48.8134 81.597 63.9333 72.0303 73.0099C63.187 81.3866 48.837 81.3866 39.9703 73.0099C30.3803 63.9333 30.217 48.8134 39.5036 39.55C48.6036 30.4267 63.397 30.4267 72.497 39.55Z"
      fill="#ED6625"
    />
    <Path
      d="M55.793 49V58.5889"
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
    />
    <Path
      d="M55.793 62.7944V63.5889"
      stroke="white"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

export default CheckWarningWithShadow;
