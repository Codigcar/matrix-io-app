import { opacity } from '@shopify/restyle';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  digitButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hiddenInput: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  caret: {
    left: 19,
    position: 'absolute',
  },
});

export default styles;
