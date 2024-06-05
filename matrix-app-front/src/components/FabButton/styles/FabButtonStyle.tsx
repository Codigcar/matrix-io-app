import { StyleSheet } from 'react-native';

// TODO: Refactor
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 10,
    right: 10,
  },
  // eslint-disable-next-line react-native/no-color-literals
  fab: {
    backgroundColor: '#56bacc', // Color de fondo del FAB
    width: 60,
    height: 60,
    borderRadius: 30, // Para hacer un círculo
    alignItems: 'center',
    justifyContent: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
});

export default styles;
