import { Image, TouchableOpacity, View } from 'react-native';
import { FabImagePropsType } from '../shared/types/types';
import styles from '../styles/FabImageStyle';

const FabImageActive = ({uri, onPress}:FabImagePropsType) => {

  return (
    <TouchableOpacity 
      style={styles.fabImageActiveTouchableOpacity} 
      onPress={onPress}>
      <Image
        style={styles.fabImageActiveImage}
        resizeMode={'cover'}
        source={{
          uri: uri,
        }}
      />
    </TouchableOpacity>
  );

}

const FabImageSecondary = ({uri, onPress}:FabImagePropsType) => {

  return (
    <TouchableOpacity 
      style={styles.fabImageSecondaryTouchableOpacity}
      onPress={onPress}>
      <Image
        style={styles.fabImageSecondaryImage}
        resizeMode={'cover'}
        source={{
          uri: uri,
        }}
      />
    </TouchableOpacity>
  );

}

const FabImageSecondaryEmpty = () => {

  return (
    <View style={styles.fabImageSecondaryEmpty} />
  );

}

const FabImageDefault = ({uri, onPress}:FabImagePropsType) => {

  return (
    <TouchableOpacity 
      style={styles.fabImageDefaultTouchableOpacity} 
      onPress={onPress}>
      <Image
        style={styles.fabImageDefaultImage}
        resizeMode={'cover'}
        source={{
          uri: uri,
        }}
      />
    </TouchableOpacity>
  );

}

const FabImageDefaultEmpty = () => {

  return (
    <View style={styles.fabImageDefaultEmpty} />
  );

}

export { FabImageActive, 
  FabImageSecondary, FabImageSecondaryEmpty, 
  FabImageDefault, FabImageDefaultEmpty}