// import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '24rem',
  },
  title: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_BOLD,
    fontSize: '24rem',
    fontWeight: '600',
    color: colors.HEADING_TITLE_DARK,
    lineHeight: '24rem',
  },
  formContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: '8rem',
    padding: '24rem',
  },
  userName: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: '16rem',
    fontWeight: '400',
    color: colors.HEADING_TITLE_DARK,
    lineHeight: '16rem',
  },
  headingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  headingTitle: {
    color: colors.ONSURFACE_300,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '13rem',
    fontWeight: '400',
    marginRight: '6rem',
    lineHeight: '13rem',
  },
  headingText: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '13rem',
    fontWeight: '400',
    lineHeight: '13rem',
  },
  formTitle: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_BOLD,
    fontSize: '20rem',
    fontWeight: '600',
    lineHeight: '20rem',
  },
  checkboxLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    fontWeight: '400',
    lineHeight: '19.6rem',
    color: colors.BLACK,
    maxWidth: '291rem',
    marginLeft: '12rem',
  },
  checkboxContainer: {
    paddingRight: '24rem',
  },
});

export default styles;
