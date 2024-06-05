import React from 'react';
import { Box, Theme } from 'matrix-ui-components';
import { BoxProps } from '@shopify/restyle';

export const DashBorder: React.FC<BoxProps<Theme>> = ({
  borderColor = 'gray100',
  height = 1,
  ...rest
}) => (
  <Box testID="dash-border" overflow="hidden" height={height} {...rest}>
    <Box borderWidth={1} borderStyle="dashed" flex={1} borderColor={borderColor} />
  </Box>
);
