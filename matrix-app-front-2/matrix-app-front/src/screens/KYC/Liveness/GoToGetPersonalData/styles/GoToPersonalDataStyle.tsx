// import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
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
    maxWidth: '255rem',
    lineHeight: 24,
  },
  text: {
    fontSize: '14rem',
    color: colors.BLACK,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    textAlign: 'center',
    maxWidth: '60%',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '80%',
    position: 'absolute',
    bottom: 32,
    alignItems: 'center',
  },
});

export default styles;
