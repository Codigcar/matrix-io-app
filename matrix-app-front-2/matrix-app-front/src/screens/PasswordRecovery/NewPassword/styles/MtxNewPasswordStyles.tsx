import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { DEFAULT_SPACE, screenWidth } from 'src/utils/constants';

const mHorizontal = DEFAULT_SPACE * 1.5;

const styles = EStyleSheet.create({
  tooltipContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    paddingHorizontal: '10rem',
    paddingTop: '10rem',
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: '#D1D4E0',
    top: '110rem',
    zIndex: 25,
  },
  tooltipRow: {
    position: 'absolute',
    left: screenWidth / 2 - mHorizontal - mHorizontal - 5,
    transform: [{ rotate: '45deg' }],
    width: 20,
    height: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 4,
    top: -11,
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftColor: '#D1D4E0',
    borderTopColor: '#D1D4E0',
  },
});

export default styles;
