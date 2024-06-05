import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const Smile = ({ width, height, strokeColor }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 29.333h8c6.667 0 9.333-2.666 9.333-9.333v-8c0-6.667-2.666-9.333-9.333-9.333h-8c-6.667 0-9.333 2.666-9.333 9.333v8c0 6.667 2.666 9.333 9.333 9.333z"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.333 11c1.334 1.333 3.507 1.333 4.854 0M17.813 11c1.334 1.333 3.507 1.333 4.854 0M11.2 17.333h9.6c.667 0 1.2.534 1.2 1.2 0 3.32-2.68 6-6 6s-6-2.68-6-6c0-.666.533-1.2 1.2-1.2z"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Smile;
