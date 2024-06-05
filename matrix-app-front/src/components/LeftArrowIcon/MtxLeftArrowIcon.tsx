import React from 'react';
import { Pressable } from 'react-native';
import { LeftArrowButtonType } from 'src/types/types';
import { colors } from 'libs/ui-toolkit/styles';
import Icon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';

/**
 * @deprecated Use ../BackHeader/index.tsx instead
 */
const MtxLeftArrowIcon = (props: LeftArrowButtonType) => {
  const { dark, onPress } = props;
  return (
    <Pressable onPress={onPress}>
      <Icon
        name="backArrow"
        size="normal"
        strokeColor={
          dark ? colors.BACK_ARROW_DARK : colors.BACK_ARROW_LIGHT
        }
      />
    </Pressable>
  );
};

export default MtxLeftArrowIcon;
