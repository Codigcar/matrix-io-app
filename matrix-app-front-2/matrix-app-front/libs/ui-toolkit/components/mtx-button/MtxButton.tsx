/* eslint-disable no-nested-ternary */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Pressable } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
// Styles
import { colors } from 'libs/ui-toolkit/styles';
import styles from './styles/MtxButtonStyles';

type MtxButtonPropsType = {
  label: string;
  type?: 'primary' | 'secondary' | 'outline';
  small?: boolean;
  onPress?: () => void;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  isDisabled?: boolean;
  isLoading?: boolean;
  testID?: string;
  analyticsDisabled?: boolean;
};

const primaryGradientColors = ['#0D1332', '#545B7E'];
const secondaryGradientColors = ['#545B7E', '#979DBA'];
const disabledGradientColors = ['#D1D4E0', '#D1D4E0'];

/**
 * @deprecated The method should not be used
 */
const MtxButton = ({
  label,
  type,
  small,
  onPress,
  leftIcon,
  rightIcon,
  isDisabled,
  isLoading,
  testID,
  analyticsDisabled = false,
}: MtxButtonPropsType) => {
  const handlePress = () => {
    if (!analyticsDisabled) {
      logVirtualEventAnalytics({
        tipoEvento: 'Click',
        tipoElemento: 'Boton',
        valor: label,
      });
    }
    onPress?.();
  };

  return (
    <Pressable onPress={handlePress} isDisabled={isDisabled || isLoading} testID={testID}>
      {({ isPressed }) => type === 'outline' ? (
        <View
          style={[
            small ? styles.baseSmall : styles.baseStyle,
            styles.outlineStyle,
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
            <ActivityIndicator style={styles.loader} size="small" color={colors.WHITE} />
          )}
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      ) : (
        <LinearGradient
          {...{ leftIcon, rightIcon }}
          colors={
            isDisabled || isLoading
              ? disabledGradientColors
              : type === 'secondary'
                ? secondaryGradientColors
                : primaryGradientColors
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            small ? styles.baseSmall : styles.baseStyle,
            type === 'secondary' && styles.secondaryStyle,
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
            <ActivityIndicator style={styles.loader} size="small" color={colors.WHITE} />
          )}
          <Text style={styles.buttonText}>{label}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
};

MtxButton.defaultProps = {
  type: 'primary',
  small: false,
  onPress: () => {},
  leftIcon: null,
  rightIcon: null,
  isDisabled: false,
  isLoading: false,
  testID: 'testID',
  analyticsDisabled: false,
};

export default MtxButton;
