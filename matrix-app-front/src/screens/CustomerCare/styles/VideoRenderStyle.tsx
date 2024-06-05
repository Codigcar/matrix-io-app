import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gradientTop: {
    position: 'absolute',
    width: '100%',
    height: 160,
  },
  gradientRight: {
    position: 'absolute',
    width: 146,
    height: '100%',
    alignSelf: 'flex-end',
  },
  gradientBottom: {
    position: 'absolute',
    width: '100%',
    height: 200,
    bottom: 0,
  },
});

export default styles;
