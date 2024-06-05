import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const RightArrow = ({ width, height, strokeColor }: IconProps) => (
  <Svg
    width={width || 6}
    height={height || 9}
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M1 1L4.5 4.5L1 8"
      stroke={strokeColor || '#0D1332'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default RightArrow;
