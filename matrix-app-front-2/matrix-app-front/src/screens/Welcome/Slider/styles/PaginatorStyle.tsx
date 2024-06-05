import EStyleSheet from 'react-native-extended-stylesheet';
import { Theme } from 'matrix-ui-components';

const styles = (theme: Theme) => EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
   },
  dotStyle: {
    height: '10rem',
    width: '29rem',
    borderRadius: '8rem',
    marginHorizontal: -4,
    borderColor: theme.colors.primary1000,
    backgroundColor: theme.colors.white,
    borderWidth: 3,
  },
  inactiveDotStyle: {
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.primary300,
  },
});

export default styles;
