import React from 'react';
import { BoxProps } from '@shopify/restyle';
import { Box, Text, Theme, useTheme } from 'matrix-ui-components';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { StyleSheet, SwitchProps as SwitchBaseProps, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { AnalyticsProps } from 'src/types/types';

interface SwitchProps extends BoxProps<Theme>, AnalyticsProps {
  label: string;
  hideLabel?: boolean;
  onToggle?: SwitchBaseProps['onValueChange'];
  checked?: boolean;
  disabled?: boolean;
  testID?: string;
}

const Switch: React.FC<SwitchProps> = ({
  disabled,
  testID,
  checked,
  onToggle,
  label,
  hideLabel,
  analytics,
  ...rest
}) => {
  const { colors } = useTheme();

  const left = useSharedValue(0);
  const bgColor = useSharedValue(colors.primary300);

  const styles = StyleSheet.create({
    container: {
      width: RFValue(44),
      borderRadius: RFValue(12),
      padding: RFValue(4),
    },
    circle: {
      width: RFValue(16),
      height: RFValue(16),
      borderRadius: RFValue(16),
      backgroundColor: !disabled ? colors.white : colors.primary200,
    },
  });

  const handleToggle = () => {
    if (analytics !== false) {
      logVirtualEventAnalytics({
        tipoEvento: checked ? 'Desactivar' : 'Activar',
        tipoElemento: 'Switch',
        valor: label,
        ...(typeof analytics === 'object' ? analytics : {}),
      });
    }
    onToggle?.(!checked);
  };

  left.value = checked
    ? styles.container.width - styles.circle.width - styles.container.padding * 2
    : 0;
  bgColor.value = checked ? colors.primary1000 : colors.primary300;

  const containerAnimatedStyles = useAnimatedStyle(() => ({
    backgroundColor: withSpring(bgColor.value, { overshootClamping: true }),
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(left.value, { overshootClamping: true }) }],
  }));

  return (
    <Box {...rest} flexDirection="row" alignItems="center" justifyContent="flex-start">
      <TouchableWithoutFeedback
        disabled={disabled}
        testID={testID}
        accessibilityRole="switch"
        accessibilityState={{
          checked,
        }}
        onPress={handleToggle}
      >
        <Animated.View style={[containerAnimatedStyles, styles.container]}>
          <Animated.View style={[animatedStyles, styles.circle]} />
        </Animated.View>
      </TouchableWithoutFeedback>
      {!hideLabel && (
        <Text ml="spacing-s" variant="body">
          {label}
        </Text>
      )}
    </Box>
  );
};

Switch.defaultProps = {
  onToggle: undefined,
  checked: undefined,
  disabled: undefined,
  testID: undefined,
  hideLabel: false,
};

export default Switch;
