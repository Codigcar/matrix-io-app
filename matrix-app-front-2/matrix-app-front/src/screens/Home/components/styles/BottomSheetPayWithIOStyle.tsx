import Colors from 'libs/ui-toolkit/styles/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  separator: {
    borderBottomColor: Colors.PRIMARY_LIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonApple: {
    backgroundColor: Colors.BLACK,
  },
});

export default styles;
