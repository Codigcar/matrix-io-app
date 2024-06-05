import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const CardWithStar = ({ width, height, strokeColor = '#81AAED' }: IconProps) => (
  <Svg
    width={width || 26}
    height={height || 24}
    viewBox="0 0 26 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M2 8.5H12.5"
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6 16.5H8"
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 16.5H14.5"
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 14.03V16.11C22 19.62 21.11 20.5 17.56 20.5H6.44C2.89 20.5 2 19.62 2 16.11V7.89C2 4.38 2.89 3.5 6.44 3.5H12.5"
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.2257 5.68198C17.7629 4.86406 19.0219 3.60507 19.8398 2.06786C20.6578 3.60507 21.9167 4.86406 23.454 5.68198C21.9167 6.49989 20.6578 7.75888 19.8398 9.29609C19.0219 7.75888 17.7629 6.49989 16.2257 5.68198Z"
      stroke={strokeColor}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </Svg>
);

export default CardWithStar;
