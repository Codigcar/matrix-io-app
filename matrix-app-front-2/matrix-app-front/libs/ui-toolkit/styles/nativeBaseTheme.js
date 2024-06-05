import { extendTheme } from 'native-base';
import colors from './Colors';
import fonts from './Fonts';

export default extendTheme({
  colors: {
    primary: {
      200: colors.PRIMARY_200,
      300: colors.PRIMARY_100,
      500: colors.PRIMARY_500,
      700: colors.PRIMARY_600,
    },
    secondary: {
      200: colors.SECONDARY_200,
      300: colors.SECONDARY_50,
      500: colors.SECONDARY_50,
      700: colors.SECONDARY_100,
    },
    danger: {
      500: colors.ERROR,
      700: colors.ERROR_DARK,
    },
  },
  components: {
    Input: {
      baseStyle: {
        borderRadius: 8,
        fontFamily: fonts.GRAPHIE_BOLD,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colors.WHITE,
        borderColor: colors.ONSURFACE_300,
        borderWidth: 1,
        fontSize: 14,
      },
      variants: {
        otp: ({ isSuccces }) => ({
          height: '48px',
          width: '48px',
          fontSize: '14px',
          borderColor: isSuccces ? colors.SUCCESS_OTP : colors.ONSURFACE_300,
          borderWidth: isSuccces ? 2 : 1,
        }),
        pin: ({ isSuccces }) => ({
          height: '56px',
          width: '44px',
          fontSize: 40,
          marginRight: '20px',
          borderColor: isSuccces ? colors.SUCCESS_OTP : colors.ONSURFACE_300,
          borderWidth: isSuccces ? 2 : 1,
        }),
      },
    },
  },
});
