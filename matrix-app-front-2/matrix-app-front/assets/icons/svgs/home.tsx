import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Home = ({ width, height, strokeColor, fill }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill ?? 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M10.07 2.82L3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01z"
      stroke={strokeColor || '#D1D4E0'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke={fill || '#D1D4E0'}
      strokeWidth={1.5}
      fill={strokeColor || '#D1D4E0'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Home;
