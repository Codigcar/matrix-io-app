/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
// Types
import { CameraButtonPropsType } from 'src/types/types';
// Styles
import styles from './styles/VideoButtonStyles';

const MtxVideoButton = ({ onPress, isLoading }: CameraButtonPropsType) => (
  <TouchableOpacity
    disabled={isLoading}
    style={[styles.outterContainer, isLoading && styles.loadingStyle]}
    {...{ onPress }}
  >
    <View style={[styles.innerContainer, isLoading && styles.loadingStyle]}>
      <View style={styles.redCircle} />
    </View>
  </TouchableOpacity>
);

export default MtxVideoButton;
