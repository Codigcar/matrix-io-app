import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const Ticket = ({ width, height, strokeColor,fill }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M19.5 12.5A2.5 2.5 0 0122 10V9c0-4-1-5-5-5H7C3 4 2 5 2 9v.5a2.5 2.5 0 010 5v.5c0 4 1 5 5 5h10c4 0 5-1 5-5a2.5 2.5 0 01-2.5-2.5z"
      stroke={strokeColor || '#D1D4E0'}
      strokeWidth={1.5}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 4v16"
      stroke={strokeColor || '#D1D4E0'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="6 6"
    />
    <Path
      d="M15.025 9.33l.62 1.25c.06.12.18.21.31.23l1.38.2c.34.05.48.47.23.71l-1 .97c-.1.09-.14.23-.12.37l.24 1.37c.06.34-.3.6-.6.44l-1.23-.65a.445.445 0 00-.39 0l-1.23.65c-.31.16-.66-.1-.6-.44l.24-1.37a.422.422 0 00-.12-.37l-.99-.97a.416.416 0 01.23-.71l1.38-.2c.14-.02.25-.1.31-.23l.61-1.25c.14-.31.58-.31.73 0z"
      stroke={strokeColor || '#D1D4E0'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Ticket;