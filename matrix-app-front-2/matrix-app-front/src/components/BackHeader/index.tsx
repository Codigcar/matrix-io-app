import { SpacingProps } from '@shopify/restyle';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Theme, useTheme } from 'matrix-ui-components';
import { BackButton, BackButtonDark } from 'assets/svgs';

interface Props extends SpacingProps<Theme> {
  onPress?: () => void;
  theme?: 'light' | 'dark';
  /**
   * @deprecated Old branding should be migrated.
   */
  color?: string;
}

export const BackHeader: React.FC<Props> = ({
  onPress,
  theme,
  color,
  ...rest
}) => {
  const { colors, rebranding } = useTheme();

  const Back = theme === 'light' ? BackButton : BackButtonDark;

  return (
    <TouchableOpacity onPress={onPress} testID="BackHeader">
      <Box {...rest}>
        {rebranding ? (
          <Back />
        ) : (
          <MtxIcon name="backArrow" size="normal" strokeColor={color || colors.primaryDark} />
        )}
      </Box>
    </TouchableOpacity>
  );
};

BackHeader.defaultProps = {
  onPress: () => undefined,
  theme: 'light',
  color: '',
};

export default BackHeader;
