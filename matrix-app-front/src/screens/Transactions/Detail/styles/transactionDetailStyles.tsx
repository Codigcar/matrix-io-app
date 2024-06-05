import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { DEFAULT_SPACE } from 'src/utils/constants';

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    padding: '5rem',
    marginHorizontal: DEFAULT_SPACE * 1.5,
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 72,
    height: 72,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.FOURTH_TEXT,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    position: 'absolute',
    top: 36,
    width: '327rem',
    paddingBottom: 20,
    paddingTop: 60,
    backgroundColor: colors.WHITE,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.FOURTH_TEXT,
    alignItems: 'center',
  },
  brandText: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '22rem',
    color: colors.LABEL,
    lineHeight: '22rem',
    textAlignVertical: 'center',
  },
  amountText: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '30rem',
    color: colors.LABEL,
    lineHeight: '30rem',
    textAlignVertical: 'center',
  },
  returnAmountText: {
    color: colors.SUCCESS_DARK,
  },
  infoContainer: {
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  returnContainer: {
    marginTop: 150,
  },
  returnLabel: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '15rem',
    color: colors.LABEL,
    lineHeight: '15rem',
    textAlignVertical: 'center',
  },
});

export default styles;
