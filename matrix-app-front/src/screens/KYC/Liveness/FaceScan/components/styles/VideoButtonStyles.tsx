// import { StyleSheet } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  outterContainer: {
    width: '72rem',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: '35rem',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  innerContainer: {
    width: '56rem',
    height: undefined,
    aspectRatio: 1,
    borderRadius: '28rem',
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingStyle: {
    opacity: 0.3,
  },
  redCircle: {
    width: '24rem',
    height: undefined,
    aspectRatio: 1,
    borderRadius: '12rem',
    backgroundColor: colors.VIDEO_BUTTON,
  },
  hideButton: { width: '72rem', height: undefined, aspectRatio: 1 },
  hideCrono: {
    height: '24rem',
  },
});

export default styles;
