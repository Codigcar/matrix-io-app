import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.GRAPHIE_SEMIBOLD,
    color: colors.WHITE,
    fontSize: '20rem',
    lineHeight: '24rem',
    maxWidth: '200rem',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIconContainer: {
    position: 'absolute',
  },
  text: {
    fontFamily: fonts.GRAPHIE_REGULAR,
    color: colors.WHITE,
    fontSize: '16rem',
    lineHeight: '24rem',
    maxWidth: '230rem',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    with: '100%',
    alignItems: 'center',
  },
});

export default styles;
