import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const TransactionExtorn = ({ width, height, strokeColor }: IconProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M22 8.5H9.5M18 16.5h-2M13.5 16.5h-4"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M2 14.03v2.08c0 3.51.89 4.39 4.44 4.39h11.12c3.55 0 4.44-.88 4.44-4.39V7.89c0-3.51-.89-4.39-4.44-4.39H9.5"
            stroke={strokeColor || '#545B7E'}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M4 3.5v6l-2-2M4 9.5l2-2"
            stroke="#3E9438"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default TransactionExtorn;
