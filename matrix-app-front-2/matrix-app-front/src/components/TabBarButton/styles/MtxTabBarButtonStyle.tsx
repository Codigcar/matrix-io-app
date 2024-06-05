import { StyleSheet } from 'react-native';
import { fonts } from 'libs/ui-toolkit/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: 12,
    lineHeight: 15.2,
  },
});

export default styles;
