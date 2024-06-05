import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles, { activityIndicatorColor } from './styles/FaceScanLoadingStyle';

const FaceScanLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator color={activityIndicatorColor} size="large" />
  </View>
);

export default FaceScanLoading;
