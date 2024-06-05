import React from 'react';
import { Box } from 'matrix-ui-components';
import BgTransparent from 'assets/svgs/bg-transparent.svg';
import { StyleSheet } from 'react-native';

export const BackgroundTransparent = () => (
  <Box style={StyleSheet.absoluteFill}  alignItems={'center'} >
    <BgTransparent height="100%"   width="100%" preserveAspectRatio="none" pointerEvents="none" />
  </Box>
);
