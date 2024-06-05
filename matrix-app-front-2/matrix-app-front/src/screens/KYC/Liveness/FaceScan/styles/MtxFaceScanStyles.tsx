import { Dimensions, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const { height, width } = Dimensions.get('screen');
const borderWidth = height;
const maskMarginVertical = 60;
const styles = EStyleSheet.create({
  $maskTopMargin: '172rem',
  $borderWidth: height,
  $maskMarginVertical: maskMarginVertical,
  $leftPosotion: '$maskMarginVertical / 2',
  $focusBoxWidth: width - maskMarginVertical + borderWidth * 2,
  container: {
    flex: 1,
    backgroundColor: colors.LIVENESS_MASK_COLOR,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  maskContainer: {
    position: 'absolute',
    width: '$focusBoxWidth',
    height: undefined,
    aspectRatio: 1,
    top: '$maskTopMargin - $borderWidth',
    borderWidth: '$borderWidth',
    borderRadius: '$focusBoxWidth / 2',
    borderColor: colors.LIVENESS_MASK_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicatorContainer: {
    position: 'absolute',
    top: '$maskTopMargin - 20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickContainer: {
    position: 'absolute',
    width: '280rem',
    height: undefined,
    aspectRatio: 1,
    borderRadius: '140rem',
    backgroundColor: colors.WHITE_40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
    fontSize: '20rem',
    lineHeight: '24rem',
    color: colors.WHITE,
    maxWidth: '164rem',
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: '8rem',
  },
  infoText: {
    top: height < 750 ? 25 : 0,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    textAlignVertical: 'center',
    color: colors.WHITE,
    maxWidth: '186rem',
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default styles;
