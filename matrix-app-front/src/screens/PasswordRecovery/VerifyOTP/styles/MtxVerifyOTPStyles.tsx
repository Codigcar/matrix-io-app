import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { DEFAULT_SPACE } from 'src/utils/constants';

const mHorizontal = DEFAULT_SPACE * 1.5;

const styles = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: '5rem',
    marginHorizontal: mHorizontal,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleLight: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_LIGHT,
    fontSize: '24rem',
    color: colors.HEADING_TITLE_GRAY,
    textAlignVertical: 'center',
    lineHeight: '24rem',
  },
  titleSemiBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '24rem',
    color: colors.HEADING_TITLE_DARK,
    textAlignVertical: 'center',
    fontWeight: '600',
    lineHeight: '24rem',
  },
  messageRegular: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    color: colors.LABEL,
    textAlignVertical: 'center',
    lineHeight: '19.6rem',
    maxWidth: '291rem',
  },
  messageSemiBold: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '14rem',
    color: colors.LABEL,
    textAlignVertical: 'center',
    fontWeight: '600',
    lineHeight: '19.6rem',
  },
  labelRegular: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '15rem',
    color: colors.LABEL,
    textAlignVertical: 'center',
  },
  reSendCodeButton: {
    flexDirection: 'row',
  },
  textReSendCodeLigth: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '13rem',
    color: colors.FOURTH_TEXT,
    textAlignVertical: 'center',
  },
  textReSendCodeDark: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '13rem',
    color: colors.LABEL,
    textAlignVertical: 'center',
    marginLeft: '4rem',
  },
  textCodeNotReceived: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    fontSize: '14rem',
    color: colors.LABEL,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textMatrixEmail: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    color: colors.THIRD_TEXT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default styles;
