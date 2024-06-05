import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import IconProps from 'libs/ui-toolkit/components/mtx-icon/types/iconTypes';

const TransactionInProcess = ({ width, height, strokeColor }: IconProps) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M2 11V9c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v6c0 3.5-2 5-5 5h-5"
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
            d="M2 15.5h5.34c.64 0 1.16.52 1.16 1.16v1.28"
            stroke="#ED6625"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M3.22 14.28L2 15.5l1.22 1.22M8.5 20.78H3.16c-.64 0-1.16-.52-1.16-1.16v-1.28"
            stroke="#ED6625"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M7.281 22l1.22-1.22-1.22-1.22"
            stroke="#ED6625"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default TransactionInProcess;
