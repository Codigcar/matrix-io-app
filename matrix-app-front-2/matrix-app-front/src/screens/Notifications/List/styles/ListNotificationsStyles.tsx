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
  alias: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '24rem',
    color: colors.LABEL,
    lineHeight: '32rem',
  },
  documentContainer: {
    flexDirection: 'row',
  },
  documentBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '16rem',
    color: colors.LABEL,
    lineHeight: '16rem',
  },
  documentRegular: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '16rem',
    color: colors.LABEL,
    lineHeight: '16rem',
  },
  userDataContainer: {
    width: '98%',
    marginHorizontal: '1%',
    marginBottom: '5rem',
    backgroundColor: colors.WHITE,
    paddingHorizontal: '15rem',
    paddingVertical: '25rem',
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
  dataContainer: {
    width: '100%',
  },
  dataLabelText: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '15rem',
    color: colors.LABEL_PROFILE,
    lineHeight: '15rem',
  },
  dataValueContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataValueText: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '16rem',
    color: colors.PROFILE_TEXT,
    lineHeight: '20rem',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: '20rem',
    left: '5rem',
  },
  logoutButton: {
    height: '30rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: '10rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '16rem',
    color: colors.THIRD_TEXT,
    lineHeight: '16rem',
  },
});

export default styles;
