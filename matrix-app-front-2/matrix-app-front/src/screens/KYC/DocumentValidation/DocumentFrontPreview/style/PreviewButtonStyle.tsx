// Styles
import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'ui-toolkit/styles';

const styles = EStyleSheet.create({
  darkStyle: {
    width: '327rem',
    height: '56rem',
    borderRadius: '12rem',
    borderWidth: '1rem',
    borderColor: colors.ONSURFACE_300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  lightStyle: {
    width: '327rem',
    height: '56rem',
    borderRadius: '12rem',
    borderWidth: '2rem',
    borderColor: colors.ONSURFACE_300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  smallButton: {
    width: '120rem',
    height: '32rem',
    borderRadius: '8rem',
  },
  buttonText: {
    fontSize: '16rem',
    fontFamily: fonts.GRAPHIE_SEMIBOLD,
    color: colors.WHITE,
  },
  smallButtonText: {
    fontSize: '12rem',
    fontFamily: fonts.GRAPHIE_SEMIBOLD,
  },
  loader: {
    marginRight: '4rem',
  },
});

export default styles;
