import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { Pressable } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
// Styles
import styles from '../style/PreviewButtonStyle';

type PreviewButtonTypeProps = {
    label: string;
    onPress?: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
    testID?: string;
    isDark?: boolean;
};
const lightColors = ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'];
const darkColors = ['#545B7E', '#979DBA'];
const disabledColors = ['#D1D4E0', '#D1D4E0'];
const PreviewButton = ({
    label,
    onPress,
    isDisabled,
    isLoading,
    testID,
    isDark,
}: PreviewButtonTypeProps) => (
    <Pressable
        testID={testID}
        onPress={onPress}
        isDisabled={isDisabled || isLoading}
    >
        {({ isPressed }) => (
            <LinearGradient
                colors={
                    // eslint-disable-next-line no-nested-ternary
                    isDisabled || isLoading
                        ? disabledColors
                        : isDark
                        ? darkColors
                        : lightColors
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    isDark ? styles.darkStyle : styles.lightStyle,
                    {
                        transform: [
                            {
                                scale: isPressed ? 0.96 : 1,
                            },
                        ],
                    },
                ]}
            >
                {isLoading && (
                    <ActivityIndicator
                        style={styles.loader}
                        size="small"
                        color={'#FFF'}
                    />
                )}
                <Text style={styles.buttonText}>{label}</Text>
            </LinearGradient>
        )}
    </Pressable>
);

PreviewButton.defaultProps = {
    onPress: () => {},
    isDisabled: false,
    isLoading: false,
    testID: 'PreviewButton',
    isDark: false,
};

export default PreviewButton;
