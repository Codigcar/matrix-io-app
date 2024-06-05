import { colors } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  imageTop: {
    marginLeft: '100%',
    shadowColor: colors.black,
    shadowOffset: {
      width: -2,
      height: 7,
    },
    shadowOpacity: 0.30,
    shadowRadius: 5,
    elevation: 2,
  },
  imageBottom: {
    marginLeft: '-100%',
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
