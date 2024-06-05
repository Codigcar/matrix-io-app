// import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '28rem',
    color: colors.NEW_PRIMARY_500,
    textAlign: 'center',
    maxWidth: '80%',
  },
  heading: {
    fontSize: '18rem',
    color: colors.BLACK,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  headingBold: {
    fontSize: '18rem',
    color: colors.BLACK,
    fontFamily: fonts.EUCLID_CIRCULAR_A_BOLD,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: '24rem',
  },
  text: {
    fontSize: '14rem',
    color: colors.BLACK,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: '24rem',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: '32rem',
  },
});

export default styles;
