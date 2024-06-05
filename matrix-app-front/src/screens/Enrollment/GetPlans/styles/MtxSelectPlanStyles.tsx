import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'ui-toolkit/styles';
import { DEFAULT_SPACE } from 'utils/constants';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginHorizontal: DEFAULT_SPACE * 1.5,
  },
  titleSemiBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_BOLD,
    fontSize: 24,
    color: colors.HEADING_TITLE_DARK,
    height: 30,
    textAlignVertical: 'center',
  },

  subTitleSemiBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: 14,
    color: colors.HEADING_TITLE_DARK,
    height: 16,
    textAlignVertical: 'center',
  },

  plansView: {
    flex: 1,
  },
  plansElement: {
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    borderColor: '#81AAED',
    borderRadius: '16rem',
    paddingHorizontal: '24rem',
    paddingVertical: '22rem',
  },
  textNamePlan: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: 16,
    color: '#81AAED',
  },
  textPrice: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_BOLD,
    fontSize: 32,
    color: '#0D1332',
  },

  textPeriod: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    color: '#0D1332',
    fontSize: 16,
    marginLeft: '16rem',
    marginTop: '8rem',
  },
  radioGroup: {
    marginTop: '8rem',
    marginLeft: '16rem',
    with: '16rem',
  },
  checkLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    lineHeight: '19.6rem',
    fontWeight: '400',
    marginLeft: '8rem',
    maxWidth: '288rem',
  },
  checkLabelSemiBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '14rem',
    lineHeight: '19.6rem',
    fontWeight: '400',
    marginLeft: '8rem',
    maxWidth: '288rem',
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEFAULT_SPACE * 2.5,
  },
});

export default styles;
