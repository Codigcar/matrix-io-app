import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  title: {
    color: colors.HEADING_TITLE_DARK,
    fontSize: '32rem',
    lineHeight: '32rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.LABEL,
    fontSize: '18rem',
    lineHeight: '24rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
    textAlign: 'center',
  },
  text: {
    color: colors.TEXT_80,
    fontSize: '14rem',
    lineHeight: '24rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
    textAlign: 'center',
    maxWidth: '260rem',
  },
  boldText: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
