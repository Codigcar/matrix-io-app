/* eslint-disable react-native/no-inline-styles */
import { Box } from 'matrix-ui-components';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Background from 'assets/svgs/background-button.svg';
// Types
import { CameraButtonPropsType } from 'src/types/types';
// Styles
import styles from './styles/VideoButtonStyles';

const VideoButton = ({ onPress, isLoading }: CameraButtonPropsType) => (
  <TouchableOpacity
    disabled={isLoading}
    style={[styles.outterContainer, isLoading && styles.loadingStyle]}
    {...{ onPress }}
  >
    <Box position="absolute" width="100%" height="100%">
      <Background width="100%" height="100%" />
    </Box>
    <Box style={[styles.innerContainer, isLoading && styles.loadingStyle]}>
      <Box style={styles.redCircle} backgroundColor="FeedbackError600" />
    </Box>
  </TouchableOpacity>
);

export default VideoButton;
