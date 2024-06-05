import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_MEDIUM,
    padding: '8rem',
    borderRadius: '4rem',
  },
  text: {
    color: colors.WHITE,
    fontSize: '10rem',
    lineHeight: '10rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
  },
});

export default styles;
