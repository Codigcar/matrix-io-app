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
  subtitle: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: '18rem',
    lineHeight: '24rem',
    fontWeight: '400',
    maxWidth: '300rem',
  },
  switchBox: {
    backgroundColor: colors.WHITE,
    borderRadius: '16rem',
    padding: '24rem',
    borderWidth: 1,
    borderColor: colors.ONSURFACE_100,
  },
  checklistRowContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  checklistLabel: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    lineHeight: '16rem',
    fontWeight: '400',
    maxWidth: '240rem',
  },
  checklistIcon: {
    width: '16rem',
    height: undefined,
    aspectRatio: 1,
    marginEnd: '15.5rem',
  },
  switchRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.PRIMARY_LIGHTEST,
    borderRadius: '100rem',
    paddingVertical: '8rem',
    paddingHorizontal: '14rem',
    width: '130rem',
  },
  switchLabel: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: '15rem',
    lineHeight: '24rem',
    fontWeight: '400',
  },
  switchLabelSelected: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
  },
  floatButtonContainer: {
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  normalButtonContainer: {
    width: '100%',
    alignSelf: 'center',
    position: 'relative',
  },
});

export default styles;
