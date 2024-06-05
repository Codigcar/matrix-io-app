import { theme } from 'matrix-ui-components';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const Styles = StyleSheet.create({
  default: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(1),
    top: RFValue(-12),
    left: RFValue(15),
    zIndex: 1,
  },
  buttonContainer: {
    padding: theme.spacing['spacing-xs'],
    borderRadius: 18,
    paddingTop: theme.spacing['spacing-m'],
    height: RFValue(205),
  },
});
export default Styles;
