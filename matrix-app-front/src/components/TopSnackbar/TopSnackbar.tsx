import React from 'react';
import {
  Text, View, Image, ImageSourcePropType, Pressable,
} from 'react-native';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
// Styles
import styles from './styles/TopSnackbarStyle';

type TopSnackbarPropsType = {
  label: string;
  image?: ImageSourcePropType;
  iconName?: string;
  size?: 'xsmall' | 'small' | 'normal' | 'medium' | 'large' | 'xlarge';
  action?: () => void;
};
const TopSnackbar = ({
  label, image, iconName, action, size,
}: TopSnackbarPropsType) => (
  <View style={styles.container}>
    <Pressable style={styles.box} onPress={action}>
      {iconName ? (
        <MtxIcon name={iconName || 'error'} size={size || 'normal'} />
      ) : (
        <Image source={image} style={styles.icon} />
      )}
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  </View>
);

export default TopSnackbar;
