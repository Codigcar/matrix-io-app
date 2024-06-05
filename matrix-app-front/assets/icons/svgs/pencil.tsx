import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const Pencil = ({ width, height, strokeColor }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M11.26 2.6l-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16zM9.89 4.05a6.126 6.126 0 005.45 5.15M1 21h18"
      stroke={strokeColor || '#0D1332'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Pencil;
