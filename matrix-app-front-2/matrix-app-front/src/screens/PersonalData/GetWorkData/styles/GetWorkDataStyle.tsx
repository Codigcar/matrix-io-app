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
  switchBox: {
    backgroundColor: colors.WHITE,
    borderRadius: '8rem',
    padding: '24rem',
    borderWidth: 1,
    borderColor: colors.ONSURFACE_100,
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
  switchBoxTitle: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: '16rem',
    lineHeight: '24rem',
    fontWeight: '400',
  },
  switchTitle: {
    color: colors.PRIMARY_DARK,
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: '15rem',
    lineHeight: '24rem',
    fontWeight: '400',
  },
  switchLabel: {
    color: colors.PRIMARY_MEDIUM,
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
});

export default styles;
