import React from 'react';
// Components
import { View } from 'react-native';
// Styles
// eslint-disable-next-line import/no-relative-packages
import { colors } from 'libs/ui-toolkit/styles';

type DotProps = {
    isCurrent: boolean;
    size?: number;
};

const styles = {
    dot: {
        height: undefined,
        aspectRatio: 1,
        marginRight: 8,
    },
};

const Dot = ({ isCurrent, size }: DotProps) => (
    <View
        style={[
            styles.dot,
            {
                backgroundColor: isCurrent
                    ? colors.BLACK_700
                    : colors.ONSURFACE_100,
                width: size,
                borderRadius: size ? size / 2 : size,
            },
        ]}
    />
);

Dot.defaultProps = {
    size: 10,
};

export default Dot;
