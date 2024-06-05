import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const TransactionPayed = ({ width, height, strokeColor }: IconProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M22 10H2"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12.452 20.5h5.11c3.55 0 4.45-.88 4.45-4.39V7.89c0-3.18-.74-4.2-3.53-4.36-.28-.01-.59-.02-.92-.02H6.452c-3.55 0-4.45.88-4.45 4.39v4.41"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M18 16h-4"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M10 18c0 .75-.21 1.46-.58 2.06A3.97 3.97 0 016 22a3.97 3.97 0 01-3.42-1.94A3.92 3.92 0 012 18c0-2.21 1.79-4 4-4s4 1.79 4 4z"
            stroke="#3E9438"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M4.441 18l.99.99 2.13-1.97"
            stroke="#3E9438"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default TransactionPayed;
