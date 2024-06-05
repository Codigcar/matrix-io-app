import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const NotificationBing = ({ width, height }: IconProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      cx={12}
      cy={12}
      r={12}
      fill="#D9261F"
      d="M26 13A13 13 0 0 1 13 26A13 13 0 0 1 0 13A13 13 0 0 1 26 13z"
    />
    <Path
      d="M13 8.984V11.389"
      stroke="white"
      strokeWidth={1.625}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M13.014 5.778C10.357 5.778 8.204 7.93 8.204 10.588V12.104C8.204 12.596 8.002 13.332 7.749 13.751L6.832 15.282C6.269 16.228 6.659 17.283 7.699 17.629C11.151 18.778 14.885 18.778 18.337 17.629C19.312 17.304 19.731 16.163 19.204 15.282L18.287 13.751C18.034 13.332 17.832 12.588 17.832 12.104V10.588C17.824 7.944 15.658 5.778 13.014 5.778Z"
      stroke="white"
      strokeWidth={1.625}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
    <Path
      d="M15.405 17.926C15.405 19.247 14.322 20.331 13 20.331C12.343 20.331 11.736 20.056 11.303 19.623C10.87 19.189 10.595 18.583 10.595 17.926"
      stroke="white"
      strokeWidth={1.625}
      strokeMiterlimit={10}
    />
  </Svg>
);

export default NotificationBing;
