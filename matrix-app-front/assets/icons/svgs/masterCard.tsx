import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const MasterCard = ({ width = 618.03101, height = 1000.008, strokeColor }: MtxSvgIconTypeProps) => (
  <Svg
    height={height}
    viewBox="0 0 1000.008 618.03103"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <G transform="matrix(8.5837610323 0 0 8.5837610323 -2898.73609385976 -2239.50304064073)">
      <Path d="m380.20001 268.60001h31.5v56.599998h-31.5z" fill="#ff5f00" />
      <Path
        d="m382.2 296.9c0-11.5 5.4-21.7 13.7-28.3-6.1-4.8-13.8-7.7-22.2-7.7-19.9 0-36 16.1-36 36s16.1 36 36 36c8.4 0 16.1-2.9 22.2-7.7-8.3-6.5-13.7-16.8-13.7-28.3z"
        fill="#eb001b"
      />
      <Path
        d="m454.2 296.9c0 19.9-16.1 36-36 36-8.4 0-16.1-2.9-22.2-7.7 8.4-6.6 13.7-16.8 13.7-28.3s-5.4-21.7-13.7-28.3c6.1-4.8 13.8-7.7 22.2-7.7 19.9 0 36 16.2 36 36z"
        fill="#f79e1b"
      />
    </G>
  </Svg>
);

export default MasterCard;
