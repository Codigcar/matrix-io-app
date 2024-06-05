import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';

const styles = EStyleSheet.create({
  pressable: {
    width: '100%',
  },
  dropdownBaseStyle: {
    height: '48rem',
    width: '100%',
    paddingHorizontal: '16rem',
    borderRadius: '8rem',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: '1.5rem',
    borderColor: colors.PRIMARY_MEDIUM,
  },
  dropdownDisabledStyle: {
    backgroundColor: colors.PRIMARY_LIGHTEST,
    borderColor: colors.PRIMARY_LIGHT,
  },
  title: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '15rem',
    fontWeight: '400',
    lineHeight: '24rem',
    marginBottom: '6rem',
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.LABEL,
    fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontSize: '13rem',
    fontWeight: '400',
    lineHeight: '24rem',
  },
  textDisabled: {
    color: colors.LABEL_30,
  },
  menu: {
    borderRadius: '8rem',
    marginTop: '4rem',
    width: '280rem',
  },
  menuItem: {
    marginHorizontal: '8rem',
    borderRadius: '8rem',
  },
});

export default styles;
