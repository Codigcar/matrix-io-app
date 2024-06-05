import { StyleSheet, Dimensions } from 'react-native';
import Colors from 'libs/ui-toolkit/styles/Colors';

const screenWidth = Dimensions.get('screen').width;

const Styles = StyleSheet.create({
    start: { x: 0.0, y: 1.0 },
    end: { x: 1.0, y: 0.0 },
    lightColors: [
        Colors.BACKGROUND_BOTTOM_COLOR,
        Colors.BACKGROUND_MIDDLE_COLOR,
        Colors.BACKGROUND_TOP_COLOR,
    ],
    darkColors: [Colors.BACKGROUND_DARK, Colors.BACKGROUND_DARK],
    thirdColors: [
        Colors.BACKGROUND_WELLCOME_TOP,
        Colors.BACKGROUND_WELLCOME_BOTTOM,
    ],
    container: {
        flex: 1,
        width: screenWidth,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default Styles;
