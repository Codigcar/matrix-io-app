import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '18rem',
    color: colors.PRIMARY_DARK,
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    maxWidth: '220rem',
    textAlign: 'center',
  },
});

export default styles;
