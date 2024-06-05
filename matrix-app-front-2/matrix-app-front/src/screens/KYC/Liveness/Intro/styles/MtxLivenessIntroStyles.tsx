// import { StyleSheet } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from 'libs/ui-toolkit/styles';
import Fonts from 'libs/ui-toolkit/styles/Fonts';
import {
  DEFAULT_SPACE,
  LOGO_INTRO_LIVENESS_SIZE,
  screenWidth,
} from 'src/utils/constants';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '20rem',
  },
  imageAndTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  cronoContainer: {
    alignItems: 'center',
  },
  imageStyle: {
    width: LOGO_INTRO_LIVENESS_SIZE,
    height: LOGO_INTRO_LIVENESS_SIZE,
    alignSelf: 'center',
  },
  title: {
    fontSize: '24rem',
    lineHeight: '24rem',
    color: colors.HEADING_TITLE_GRAY,
    fontFamily: Fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
  },
  subTitle: {
    fontSize: '24rem',
    lineHeight: '24rem',
    color: colors.HEADING_TITLE_DARK,
    fontFamily: Fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
    fontWeight: '600',
  },
  disclousure: {
    fontSize: '14rem',
    lineHeight: '19.6rem',
    color: colors.HEADING_TITLE_DARK,
    fontFamily: Fonts.EUCLID_CIRCULAR_A_REGULAR,
    fontWeight: '400',
  },
});

export default styles;
