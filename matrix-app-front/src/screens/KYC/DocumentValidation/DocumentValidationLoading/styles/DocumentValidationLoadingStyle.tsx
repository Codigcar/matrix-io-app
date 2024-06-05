import { StyleSheet } from 'react-native';
import { colors, fonts } from 'ui-toolkit/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.GRAPHIE_SEMIBOLD,
    color: colors.WHITE,
    fontSize: 20,
    lineHeight: 24,
    maxWidth: 165,
    textAlign: 'center',
  },
  text: {
    fontFamily: fonts.GRAPHIE_REGULAR,
    color: colors.WHITE,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 230,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIconContainer: {
    position: 'absolute',
  },
  buttonContainer: {
    with: '100%',
    alignItems: 'center',
  },
});

export default styles;
