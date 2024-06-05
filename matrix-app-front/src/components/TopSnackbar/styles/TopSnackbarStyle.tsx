import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = StatusBarManager.HEIGHT;

const styles = EStyleSheet.create({
  container: {
    width: '86%',
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    zIndex: 10,
    alignSelf: 'center',
  },
  box: {
    width: '100%',
    padding: '18rem',
    backgroundColor: colors.WHITE,
    borderRadius: '8rem',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.PRIMARY_DARK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: '24rem',
    height: undefined,
    aspectRatio: 1,
    marginRight: '8rem',
  },
  text: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_MEDIUM,
    marginLeft: 5,
    fontSize: '14rem',
    lineHeight: '19.6rem',
    fontWeight: '600',
    color: colors.THIRD_TEXT,
  },
});

export default styles;
