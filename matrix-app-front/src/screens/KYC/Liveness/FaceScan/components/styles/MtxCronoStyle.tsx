import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY_MEDIUM,
    borderRadius: '5rem',
    paddingHorizontal: '12rem',
    height: '24rem',
    justifyContent: 'center',
    opacity: 0.83,
    alignSelf: 'center',
  },
  itemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordIndicator: {
    width: '8rem',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: colors.VIDEO_BUTTON,
    borderRadius: '4rem',
  },
  text: {
    color: colors.WHITE,
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontSize: '10rem',
    textAlign: 'center',
  },
});

export default styles;
