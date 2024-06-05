import React from 'react';
import { Box } from 'matrix-ui-components';
import BgDark from 'assets/svgs/bg-dark.svg';
import { StyleSheet } from 'react-native';
import CustomStatusBar from '../CustomStatusBar/CustomStatusBar';

export const BackgroundDark = () => (
  <Box style={StyleSheet.absoluteFill} alignItems={'center'} >
        <CustomStatusBar theme="light" />
    <BgDark height="100%"   width="100%" preserveAspectRatio="none" pointerEvents="none" />
  </Box>
);
