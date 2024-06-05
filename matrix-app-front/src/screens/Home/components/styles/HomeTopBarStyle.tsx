import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '24rem',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '24rem',
    lineHeight: '30.43rem',
    maxWidth: '119rem',
    color: colors.LABEL,
    fontWeight: '600',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButtonContainer: {
    padding: '5rem',
  },
  badgeContainer: {
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 10,
    height: 20,
    minWidth: 20,
    borderColor: 'white',
    paddingHorizontal: 6,
  },
  badge: {
    width: '100%',
  },
});

export default styles;
