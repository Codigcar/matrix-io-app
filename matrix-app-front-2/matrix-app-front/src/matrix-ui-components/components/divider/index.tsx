import React from 'react';
import { View } from 'react-native';
// Types
import { DividerTypeProps } from 'src/types/types';

export const Divider = (props: DividerTypeProps) => {
  const { width, height } = props;
  return (
    <View
      style={{
        width,
        height,
      }}
    />
  );
};

Divider.defaultProps = {
  height: 0,
  width: 0,
};

export default Divider;
