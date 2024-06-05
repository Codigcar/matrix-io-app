import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { MtxSvgIconTypeProps } from 'src/types/types';

const InternetRectangle = ({ width = 4, height = 40 }: MtxSvgIconTypeProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect width="40" height="40" rx="8" fill="#F0F1F5" />
    <Path
      d="M18.1098 19.1501H15.4598C14.8298 19.1501 14.3198 19.6601 14.3198 20.2901V25.4101H18.1098V19.1501V19.1501Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M20.7611 14.6001H19.2411C18.6111 14.6001 18.1011 15.1101 18.1011 15.7401V25.4001H21.8911V15.7401C21.8911 15.1101 21.3911 14.6001 20.7611 14.6001Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M24.5479 20.8501H21.8979V25.4001H25.688V21.9901C25.678 21.3601 25.1679 20.8501 24.5479 20.8501Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M17 30H23C28 30 30 28 30 23V17C30 12 28 10 23 10H17C12 10 10 12 10 17V23C10 28 12 30 17 30Z"
      stroke="#545B7E"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default InternetRectangle;
