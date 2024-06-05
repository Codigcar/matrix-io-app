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
    height: '50rem',
  },
});

export default styles;
