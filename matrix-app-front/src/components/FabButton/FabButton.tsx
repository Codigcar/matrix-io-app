import { Image, ImageSourcePropType, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles/FabButtonStyle';

interface FabButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
}

const FabButton: React.FC<FabButtonProps> = ({ icon, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

export default FabButton;
