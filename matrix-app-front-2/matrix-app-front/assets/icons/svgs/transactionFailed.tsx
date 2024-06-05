import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const TransactionFailed = ({ width, height, strokeColor }: IconProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M2 15.2V9c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v6c0 3.5-2 5-5 5H8.5"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 9.5v5"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M9 18c0 .75-.21 1.46-.58 2.06A3.97 3.97 0 015 22a3.97 3.97 0 01-3.42-1.94A3.92 3.92 0 011 18c0-2.21 1.79-4 4-4s4 1.79 4 4zM7.75 15.25l-5.5 5.5"
            stroke="#D9261F"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default TransactionFailed;
