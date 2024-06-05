import EStyleSheet from 'react-native-extended-stylesheet';
import { DEFAULT_SPACE, INPUT_HEIGHT } from 'src/utils/constants';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = EStyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  label: {
    fontSize: RFValue(11.375),
    lineHeight: RFValue(15.925),
    fontFamily: rebrandingTheme.fonts.outfitRegular,
    letterSpacing: 0.16,
    color: 'black',
    marginBottom: '5rem',
  },
  textinput: {
    height: '88rem',
    borderRadius: '8rem',
  },
  focusStyle: {
    borderColor: colors.PRIMARY_700,
    borderWidth: 1,
    height: INPUT_HEIGHT,
  },
  disableStyle: {
    color: colors.ONSURFACE_300,
    borderColor: colors.PRIMARY_LIGHT,
    backgroundColor: colors.PRIMARY_LIGHTEST,
  },
  invalidStyle: {
    borderColor: colors.ERROR,
    borderWidth: 2,
  },
  phonePrefixContainer: {
    height: '100%',
    alignItems: 'center',
    paddingLeft: '16rem',
    paddingRight: '10rem',
    flexDirection: 'row',
    backgroundColor: colors.BACKGROUND_PHONE_PREFIX,
  },
  phonePrefixStyle: {
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '14rem',
    color: colors.PRIMARY_700,
    marginLeft: '4rem',
    fontWeight: '500',
  },
  passButtonIcon: {
    marginRight: '8rem',
  },
  errorText: {
    color: colors.ERROR,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    top: DEFAULT_SPACE / 2,
    fontWeight: '400',
    fontSize: '12rem',
    marginLeft: '15rem',
  },
  errorPasswordRepeat: {
    color: colors.ERROR_MESSAGE,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    top: DEFAULT_SPACE / 2,
    fontWeight: '400',
  },
  gradientStyle: {
    padding: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'blue',
  },
  feedbackText: {
    fontSize: '12rem',
    color: colors.PRIMARY_MEDIUM,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    top: DEFAULT_SPACE / 2,
    marginLeft: '15rem',
  },
});

export default styles;
