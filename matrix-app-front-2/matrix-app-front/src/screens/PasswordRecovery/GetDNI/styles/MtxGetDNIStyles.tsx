import EStyleSheet from 'react-native-extended-stylesheet';
import { colors, fonts } from 'libs/ui-toolkit/styles';
import { DEFAULT_SPACE, screenHeight } from 'src/utils/constants';

const mHorizontal = DEFAULT_SPACE * 1.5;

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        padding: '5rem',
        marginHorizontal: mHorizontal,
    },
    headerContainer: {
        height: '3rem',
    },
    spaceContainer: {
        height: screenHeight * 0.25,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    titleLight: {
        fontFamily: fonts.EUCLID_CIRCULAR_A_LIGHT,
        fontSize: '24rem',
        color: colors.HEADING_TITLE_DARK,
        lineHeight: 100,
        textAlignVertical: 'center',
    },
    titleSemiBold: {
        fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
        fontSize: '24rem',
        color: colors.HEADING_TITLE_DARK,
        lineHeight: 100,
        textAlignVertical: 'center',
    },
    labelRegular: {
        fontFamily: fonts.EUCLID_CIRCULAR_A_REGULAR,
        fontSize: 15,
        color: colors.LABEL,
        lineHeight: 100,
        textAlignVertical: 'center',
    },
    textRecoveryPassword: {
        fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
        fontSize: 13,
        color: colors.LABEL,
        lineHeight: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default styles;
