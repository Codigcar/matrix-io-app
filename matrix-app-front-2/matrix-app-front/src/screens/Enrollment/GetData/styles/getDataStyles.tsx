import { colors } from 'ui-toolkit/styles';
import Fonts from 'ui-toolkit/styles/Fonts';

const GetDataStyles = {
    mainContainer: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_ENROLLMENT,
    },
    title: {
        fontFamily: Fonts.RECOLETA_BOLD,
        fontSize: Fonts.SUPER_TITLE_SIZE,
        color: colors.TEXT,
    },
    scrollContent: {
        marginHorizontal: 20,
        flex: 1,
    },
    checkBoxContainer: {
        backgroundColor: colors.BACKGROUND_LIGHT,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
};

export default GetDataStyles;
