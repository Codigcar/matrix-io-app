import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const LoadingUnion = ({ width, height }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 80 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.878 60.315L80 74.122 5.878 0v60.315zM.068 74.121L10.24 63.947l22.255 4.133-4.633.863-9.265 1.726-18.53 3.452zM74.19 60.315V0l-18.53 18.53-9.266 9.266-4.632 4.633 28.795 28.613 3.633-.727z"
      fill="url(#paint0_linear_6587_28840)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_6587_28840"
        x1={-23.5}
        y1={-20.5}
        x2={55.5}
        y2={86.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFFFFF" stopOpacity={0.52} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default LoadingUnion;
