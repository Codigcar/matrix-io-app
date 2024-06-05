import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20rem',
  },
  iconContainer: {
    width: '22rem',
    height: undefined,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '11rem',
    borderWidth: 1,
  },
  icon: {
    width: '10rem',
  },
  label: {
    fontSize: '13rem',
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    color: colors.HEADING_TITLE_GRAY,
    fontWeight: '400',
  },
});

export default styles;
