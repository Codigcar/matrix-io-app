import { createTheme } from '@shopify/restyle';
import { RFValue } from 'react-native-responsive-fontsize';
import { RebrandingTheme } from './rebranding-theme';

export const colors = {
  splash: '#F1F1F4',
  // Primary
  primaryMedium: '#979DBA',
  primaryDarkest: '#0D1332',
  primaryDark: '#545B7E',
  primaryLigth: '#D1D4E0',
  yankeesBlue: '#2B2845',
  green: '#00D27C',
  redError: '#FF0136',
  darkBlueGray: '#666A8F',
  ghostWhite: '#FAFBFC',
  white: '#FFFFFF',
  success: '#3E9438',
  disable: '#D1D4E0',
  secundaryDisable: '#F0F1F5',
  redWarning: '#E8673F',
  redDanger: '#D9261F',
  dark: '#000000',
  // Secondary
  errorMedium: '#D9261F',
  warningMedium: '#ED6625',
  textLink: '#1843AA',
  info: '#D1D5E0',
  // Transaction
  backgroundFailed: '#FCEAE9',
  textFailed: '#D9261F',
  textMethod: '#6E7184',
  backgroundReturn: '#DAF1DF',

  // Variant Scales
  gray400: '#5F6173',
  gray300: '#8084A2',
  gray200: '#A2A6BD',
  gray100: '#C6C9D8',
  gray60: '#DDDFE8',
  gray25: '#EBEDF1',
  gray5: '#F9F9FA',
  // Opacity
  greenWithOpacity: 'rgba(96, 211, 126, 0.2)',
  whiteWithOpacity: 'rgba(250, 251, 252, 0.7)',
  blackWithOpacity: 'rgba(0, 0, 0, 0.8)',
  modalWithOpacity: 'rgba(21, 24, 49, 0.8)',
  backgroundLabelOpacity: 'rgba(227,235,248,0.5)',
  transparent: 'transparent',
  black: '#11142E',
  feedbackInformativeLight: '#81AAED',
  feedbackInformativeLightest: '#E3EBF8',
  // Gradient
  bottomBackground: '#FAFAFB',
  topBackground: '#D9DAE1',

  bottomTabIcon: '#7B7A7A',
  complementaryOcean100: '#E1F1F4',
  complementaryOcean800: '#2B6A78',

  complementaryOcean500: '#5AB0C4',
  complementarySteel100: '#E5EBF0',
  complementarySteel200: '#BECDDA',
  complementarySteel900: '#2F3E4B',

  complementaryIndigo050: '#ECEEF9',
  complementaryIndigo100: '#E0E5F5',
  complementaryIndigo200: '#B2BFE6',
  complementaryIndigo500: '#ECEEF9',
  complementaryIndigo600: '#3C5BB9',
  complementaryIndigo800: '#283D7B',
  complementaryIndigo900: '#1E2D5C',
  complementaryPrimary100: '#F0F0F0',

  // Rebranding
  primary800: '#3D3D3D',
  complementaryMint900: '#005230',
  complementaryMint700: '#00A360',
  complementaryMint050: '#EBFFF7',
  feedbackInformative600: '#3C5BB9',
  feedbackInformative050: '#F0F1FA',
  FeedbackError050: '#FFEBEB',
  FeedbackError600: '#F00505',
  feedbackError050: '#FFEBEB',
  feedbackError600: '#F00505',
  FeedbackWarning600: '#F09405',

  complementaryPumpking050: '#FFF2EB',
  complementaryPumpking500: '#FD6E17',
  complementaryPumpkin600: '#F25E02',

  complementaryInformative050: '#F0F1FA',
  complementaryInformative600: '#3C5BB9',
  complementaryIndigo500Dozer: '#5672C8',
};
export const gradientColors = {
  primary: ['#0D1332', '#545B7E'],
  secondary: ['#FFFFFF', '#FFFFFF'],
  disabled: ['#D1D4E0', '#D1D4E0'],
  info: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
  danger: ['#D9261F', '#D9261F'],
  liquidaCard: ['#0E1433', '#545B7E'],
};
export const spacing = {
  'spacing-none': 0,
  'spacing-xxxxxs': RFValue(2),
  'spacing-xxxxs': RFValue(6),
  'spacing-xxxs': RFValue(4),
  'spacing-xxs': RFValue(8),
  'spacing-xs': RFValue(12),
  'spacing-s': RFValue(16),
  'spacing-m': RFValue(24),
  'spacing-sm': RFValue(32),
  'spacing-l': RFValue(48),
  'spacing-ml': RFValue(72),
  'spacing-xl': RFValue(96),
  'spacing-xxl': RFValue(120),
  'spacing-custom-l': RFValue(167),
};
export const fonts = {
  euclidCircularBold: 'EuclidCircularA-Bold',
  euclidCircularItalic: 'EuclidCircularA-Italic',
  euclidCircularLight: 'EuclidCircularA-Light',
  euclidCircularMedium: 'EuclidCircularA-Medium',
  euclidCircularRegular: 'EuclidCircularA-Regular',
  euclidCircularSemibold: 'EuclidCircularA-SemiBold',

  outfitRegular: 'Outfit-Regular',
  outfitSemibold: 'Outfit-SemiBold',
  outfitBold: 'Outfit-Bold',
  outfitMedium: 'Outfit-Medium',
  robotoSerifMedium: 'RobotoSerif-Medium',
  robotoSerifSemiBold: 'RobotoSerif-SemiBold',
  robotoSerifRegular: 'RobotoSerif-Regular',
};

export const theme = createTheme({
  fonts,
  colors,
  spacing,
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    H1: {
      fontSize: RFValue(32),
      lineHeight: RFValue(36),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    H2: {
      fontSize: RFValue(28),
      lineHeight: RFValue(32),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    H3: {
      fontSize: RFValue(24),
      lineHeight: RFValue(28),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    H4: {
      fontSize: RFValue(20),
      lineHeight: RFValue(24),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    SubTitle: {
      fontSize: RFValue(18),
      lineHeight: RFValue(22),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    body: {
      fontSize: RFValue(16),
      lineHeight: RFValue(20),
      fontFamily: fonts.euclidCircularRegular,
      color: 'black',
    },
    defaults: {
      fontSize: RFValue(16),
      lineHeight: RFValue(20),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    label: {
      fontSize: RFValue(14),
      lineHeight: RFValue(20),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    SubHead: {
      fontSize: RFValue(12),
      lineHeight: RFValue(14),
      fontFamily: 'EuclidCircularA-Light',
      color: 'black',
    },
    subContentBody: {
      fontSize: RFValue(12),
      lineHeight: RFValue(14),
      fontFamily: 'EuclidCircularA-Regular',
      color: 'primaryDarkest',
      opacity: 0.6,
    },
    chipLabel: {
      fontSize: RFValue(10),
      lineHeight: RFValue(10),
      fontFamily: 'EuclidCircularA-SemiBold',
      color: 'white',
    },
    subContentDisableBody: {
      fontSize: RFValue(12),
      lineHeight: RFValue(14),
      fontFamily: 'EuclidCircularA-Regular',
      color: 'primaryDark',
    },
    titleEmptyContent: {
      fontSize: RFValue(14),
      lineHeight: RFValue(18),
      fontFamily: 'EuclidCircularA-Medium',
      color: 'primaryDark',
    },
    contentToastNotification: {
      fontSize: RFValue(12),
      lineHeight: RFValue(18),
      fontFamily: 'EuclidCircularA-Bold',
      color: 'primaryDark',
    },
    body13pxRegular: {
      fontSize: RFValue(13),
      lineHeight: RFValue(18.2),
      fontFamily: 'Outfit',
      color: 'primaryDark',
    },
    body14pxSemiBold: {
      fontSize: RFValue(14),
      lineHeight: RFValue(19.6),
      fontFamily: 'Outfit',
      fontWeight: '600',
      color: 'primaryDark',
    },
    messageToastNotification: {
      fontSize: RFValue(13),
      lineHeight: RFValue(19),
      fontFamily: 'EuclidCircularA-Bold',
    },
    bodyToastNotification: {
      fontSize: RFValue(12),
      lineHeight: RFValue(16),
      fontFamily: 'EuclidCircularA-Regular',
      color: 'primary800',
    },
    messageInfoToastNotification: {
      fontSize: RFValue(13),
      lineHeight: RFValue(15),
      fontFamily: 'EuclidCircularA-Bold',
    },
    bodyInfoToastNotification: {
      fontSize: RFValue(12),
      lineHeight: RFValue(14),
      fontFamily: 'Outfit-Regular',
      color: 'primary800',
    },
    titleKYCLight: {
      fontSize: RFValue(20),
      lineHeight: RFValue(24),
      fontFamily: 'EuclidCircularA-SemiBold',
      color: 'white',
      maxWidth: RFValue(178),
    },
    subContentBodyLight: {
      fontSize: RFValue(14),
      lineHeight: RFValue(24),
      fontFamily: 'EuclidCircularA-Regular',
      color: 'white',
      maxWidth: RFValue(250),
    },
    sectionTitleLight: {
      fontSize: RFValue(16),
      lineHeight: RFValue(16),
      fontFamily: 'EuclidCircularA-Medium',
      color: 'primaryDarkest',
    },
    personalDataSubtitle: {
      fontSize: RFValue(13),
      lineHeight: RFValue(13),
      fontFamily: 'EuclidCircularA-Regular',
      fontWeight: '400',
      color: 'gray300',
    },
    formTitle: {
      fontSize: RFValue(20),
      lineHeight: RFValue(20),
      fontFamily: 'EuclidCircularA-Bold',
      fontWeight: '600',
    },
    labelCard: {
      fontSize: RFValue(7),
      lineHeight: RFValue(12),
      fontFamily: 'EuclidCircularA-Regular',
      color: 'primaryDarkest',
      maxWidth: RFValue(250),
    },
    headerCard: {
      fontSize: RFValue(24),
      fontWeight: '600',
      fontFamily: 'Outfit-SemiBold',
      lineHeight: RFValue(29),
      color: 'primary1000',
    },
    subHeaderCard: {
      fontSize: RFValue(17),
      fontWeight: '600',
      fontFamily: 'Outfit-SemiBold',
      lineHeight: RFValue(29),
      color: 'primaryDark',
    },
    smallLabelCard: {
      fontSize: RFValue(12),
      color: 'primaryDark',
      lineHeight: RFValue(15),
    },
    mysteryBox: {
      title: {
        fontSize: RFValue(16.6),
        lineHeight: RFValue(21.1),
        fontFamily: fonts.robotoSerifMedium,
        letterSpacing: 0,
        color: 'black',
      },
      subTitle: {
        fontFamily: fonts.outfitSemibold,
        fontSize: RFValue(13),
        lineHeight: RFValue(18),
        color: 'dark',
      },
      label: {
        fontSize: RFValue(13),
        lineHeight: RFValue(18),
        fontFamily: fonts.outfitRegular,
        color: 'dark',
      },
    },
  },
  buttonVariants: {
    primary: {
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      padding: 'spacing-s',
    },
    secondary: {
      padding: 'spacing-s',
      color: 'black',
      borderColor: 'gray200',
      overflow: 'hidden',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    disabled: {
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      padding: 'spacing-s',
    },
    danger: {
      borderRadius: 8,
      color: 'redDanger',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      padding: 'spacing-s',
    },
    info: {
      color: 'primaryDarkest',
      borderRadius: 8,
      borderWidth: 3,
      borderColor: 'info',
      padding: 'spacing-s',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  textInputVariants: {
    disabled: {
      backgroundColor: 'secundaryDisable',
      borderColor: 'primaryLigth',
    },
  },
  toastVariants: {
    danger: {
      backgroundColor: 'FeedbackError050',
      borderColor: 'FeedbackError600',
    },
    info: {
      backgroundColor: 'complementaryInformative050',
      borderColor: 'complementaryInformative600',
    },
    success: {
      backgroundColor: 'complementaryMint050',
      borderColor: 'complementaryMint700',
    },
    warning: {
      backgroundColor: 'complementaryPumpking050',
      borderColor: 'complementaryPumpking500',
    },
    black: {
      backgroundColor: 'gray5',
      borderColor: 'black',
    },
  },
  gradientColors,
});

export type Theme = typeof theme & RebrandingTheme;