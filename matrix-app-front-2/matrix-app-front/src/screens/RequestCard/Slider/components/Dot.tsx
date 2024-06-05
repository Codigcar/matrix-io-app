import React from 'react';
// Components
import { View } from 'react-native';
// Styles
import { colors } from 'matrix-ui-components';

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
        backgroundColor: isCurrent ? colors.disable : colors.primaryDark,
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
