import React from 'react';
import { Divider } from 'native-base';
// Types
import { MtxDividerTypeProps } from 'src/types/types';

/**
 * @deprecated The method should not be used
 */
const MtxDivider = (props: MtxDividerTypeProps) => {
  const { width, height } = props;
  return (
    <Divider
      style={{
        width,
        height,
      }}
      backgroundColor="transparent"
      thickness={0}
    />
  );
};

MtxDivider.defaultProps = {
  height: 0,
  width: 0,
};

export default MtxDivider;
