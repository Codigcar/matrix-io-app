/* eslint-disable react-native/no-color-literals */
// import { StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    DEFAULT_BORDER_RADIUS,
    DEFAULT_SPACE,
} from '../../../../../src/utils/constants';
// Styles
import { colors, fonts } from '../../../styles';

const styles = EStyleSheet.create({
    baseStyle: {
        borderRadius: '8rem',
        width: '24rem',
        height: '24rem',
        borderWidth: '1.5rem',
        borderColor: colors.ONSURFACE_300,
    },
    stepBaseStyle: {
        borderRadius: '50rem',
    },
    checkedStyle: {
        backgroundColor: 'transparent',
    },
    disabledStyle: {
        backgroundColor: colors.WHITE_50,
        borderColor: colors.ONSURFACE_500,
        borderRadius: DEFAULT_BORDER_RADIUS,
        borderWidth: 0,
    },
    lebelStyle: {
        fontFamily: fonts.EUCLID_CIRCULAR_A_LIGHT,
        fontSize: fonts.CHECKBOX_LIST_SIZE,
        marginLeft: DEFAULT_SPACE,
        color: colors.HEADING_TITLE_GRAY,
    },
    errorStyle: {
        color: colors.ERROR,
        fontFamily: fonts.GRAPHIE_REGULAR,
        fontSize: fonts.INPUT_FONT_SIZE,
    },
});

export default styles;
