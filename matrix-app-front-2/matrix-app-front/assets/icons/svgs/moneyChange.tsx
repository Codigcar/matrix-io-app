import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const MoneyChange = ({ width, height, strokeColor }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M2 8.5H12.5"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 16.5H8"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 16.5H14.5"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H12.5"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 4.21997H21.34C21.98 4.21997 22.5 4.73994 22.5 5.37994V6.65997"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.22 3L16 4.21997L17.22 5.43994"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22.5 9.5H17.16C16.52 9.5 16 8.97997 16 8.33997V7.06"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.2812 10.7203L22.5012 9.50031L21.2812 8.28027"
      stroke={strokeColor || '#545B7E'}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MoneyChange;
