import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Location = ({ width = 16, height = 16, strokeColor = 'black' }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M7.99998 8.95346C9.14874 8.95346 10.08 8.02221 10.08 6.87346C10.08 5.7247 9.14874 4.79346 7.99998 4.79346C6.85123 4.79346 5.91998 5.7247 5.91998 6.87346C5.91998 8.02221 6.85123 8.95346 7.99998 8.95346Z"
      stroke={strokeColor}
      strokeWidth={1.5}
    />
    <Path
      d="M2.41336 5.66016C3.7267 -0.113169 12.28 -0.106502 13.5867 5.66683C14.3534 9.0535 12.2467 11.9202 10.4 13.6935C9.06003 14.9868 6.94003 14.9868 5.59336 13.6935C3.75336 11.9202 1.6467 9.04683 2.41336 5.66016Z"
      stroke={strokeColor}
      strokeWidth={1.5}
    />
  </Svg>
);

export default Location;
