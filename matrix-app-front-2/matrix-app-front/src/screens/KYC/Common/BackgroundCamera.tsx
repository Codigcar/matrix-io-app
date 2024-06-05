import React from 'react';
import { Box } from 'matrix-ui-components';
import BgCamera from 'assets/svgs/camera-bg.svg';
import { StyleSheet } from 'react-native';

export const BackgroundCamera = () => (
  <Box style={StyleSheet.absoluteFill} alignItems={'center'} >
    <BgCamera height="100%"   width="100%" preserveAspectRatio="none" pointerEvents="none" />
  </Box>
);
