// Styles
import EStyleSheet from 'react-native-extended-stylesheet';
import { screenWidth } from 'src/utils/constants';
import { colors, fonts } from '../../../styles';

const styles = EStyleSheet.create({
    baseStyle: {
        height: '56rem',
        width: '338rem',
        borderRadius: '8rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    baseSmall: {
      height: '48rem',
      width: '242rem',
      borderRadius: '8rem',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    buttonText: {
        fontSize: '18rem',
        fontFamily: fonts.EUCLID_CIRCULAR_A_SEMIBOLD,
        fontWeight: '600',
        color: colors.WHITE,
    },
    // Styles for secondary button
    secondaryStyle: {
        borderWidth: 1,
        borderColor: colors.FOURTH_TEXT,
    },
    // Styles for outline button
    outlineStyle: {
        borderWidth: '2rem',
        borderColor: colors.ONSURFACE_300,
        backgroundColor: 'transparent',
    },
    loader: {
        marginRight: '4rem',
    },
});

export default styles;
