import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fabImageActiveTouchableOpacity: {
    height: 48,
    width: 48,
    borderRadius: 25,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  fabImageActiveImage: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#fff',
    height: 48,
    width: 48,
    borderRadius: 25,
  },
  fabImageSecondaryTouchableOpacity: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  fabImageSecondaryImage: {
    opacity: 1,
    borderWidth: 1,
    borderColor: '#666',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  fabImageSecondaryEmpty: {
    height: 40,
    width: 40,
    marginVertical: 10,
  },
  fabImageDefaultTouchableOpacity: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  fabImageDefaultImage: {
    opacity: 0.5,
    borderWidth: 1,
    borderColor: '#666',
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  fabImageDefaultEmpty: {
    height: 32,
    width: 32,
    marginVertical: 10,
  },
});

export default styles;
