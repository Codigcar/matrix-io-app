import React from 'react';
// Components
import { View } from 'react-native';
// Styles
import { colors } from 'matrix-ui-components';
import { DotProps } from '../../shared/types/components';

const styles = {
  dot: {
    height: undefined,
    aspectRatio: 1,
    marginRight: 8,
  },
};

const Dot: React.FC<DotProps> = (props) => {
  const { size, isCurrent } = props;
  return (
    <View
      testID="dot"
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
};

Dot.defaultProps = {
  size: 10,
};

export default Dot;
