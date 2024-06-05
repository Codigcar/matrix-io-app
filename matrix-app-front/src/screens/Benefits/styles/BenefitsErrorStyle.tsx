import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: colors.primary100,
    paddingTop: 120,
    paddingBottom: 120,
    width: '100%',
    borderRadius: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary000,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
