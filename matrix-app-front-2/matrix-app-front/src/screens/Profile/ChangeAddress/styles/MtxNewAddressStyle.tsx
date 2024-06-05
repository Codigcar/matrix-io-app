import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { DEFAULT_SPACE } from 'src/utils/constants';

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: '5rem',
    marginHorizontal: DEFAULT_SPACE * 1.5,
  },
  titleSemiBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '24rem',
    color: colors.HEADING_TITLE_DARK,
    lineHeight: '24rem',
  },
  spacer: {
    height: '150rem',
  },
  addressContainer: {
    width: '98%',
    marginHorizontal: '1%',
    backgroundColor: colors.WHITE,
    paddingHorizontal: '15rem',
    paddingTop: 20,
    paddingBottom: 5,
    borderRadius: 15,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  subTitle: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '20rem',
    color: colors.HEADING_TITLE_DARK,
    lineHeight: '20rem',
  },
  checkboxLabel: {
    paddingRight: '25rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    color: colors.HEADING_TITLE_DARK,
    lineHeight: '14rem',
  },
});

export default styles;
