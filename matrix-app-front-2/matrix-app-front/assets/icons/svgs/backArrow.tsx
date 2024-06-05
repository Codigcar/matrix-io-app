import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const BackArrow = ({ width, height, strokeColor }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.57 1.93L1.5 8l6.07 6.07M18.5 8H1.67"
      stroke={strokeColor || '#292D32'}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackArrow;
