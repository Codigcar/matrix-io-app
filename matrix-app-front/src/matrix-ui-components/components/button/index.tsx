import React, { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent, StyleSheet, TouchableOpacity,
} from 'react-native';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import {
  layout,
  createVariant,
  VariantProps,
  createRestyleComponent,
  spacing,
  spacingShorthand,
  SpacingProps,
  SpacingShorthandProps,
  LayoutProps,
} from '@shopify/restyle';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'matrix-ui-components';
import { BUTTON_PRESS_DELAY } from 'src/utils/constants';
import { AnalyticsProps } from 'src/types/types';
import { Theme, fonts } from '../../theme/themes';
import { Text } from '../text';

const ButtonContainer = createRestyleComponent<
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  React.ComponentProps<typeof TouchableOpacity>,
  Theme
>(
  [
    layout,
    spacing,
    spacingShorthand,
    createVariant({
      themeKey: 'buttonVariants',
    }),
  ],
  TouchableOpacity,
);

interface ButtonProps extends React.ComponentProps<typeof ButtonContainer>, AnalyticsProps {
  label?: string;
  delay?: number;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  label,
  disabled,
  variant = 'primary',
  analytics,
  delay,
  ...rest
}) => {
  const { gradientColors, rebranding } = useTheme();
  const [isDisabled, setDisabled] = useState(false);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const handlePress = (event: GestureResponderEvent) => {
    if (!isDisabled) {
      setDisabled(true);
      if (analytics || (analytics !== false && label)) {
        logVirtualEventAnalytics({
          tipoEvento: 'Click',
          tipoElemento: 'Boton',
          valor: label,
          ...(typeof analytics === 'object' ? analytics : {}),
        });
      }
      onPress?.(event);
      timer.current = setTimeout(() => {
        setDisabled(false);
      }, delay);
    }
  };

  return (
    <ButtonContainer
      variant={variant}
      onPress={handlePress}
      disabled={disabled || isDisabled}
      {...rest}
    >
      <LinearGradient
        colors={typeof variant === 'string' ? gradientColors[variant] : []}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Text
        color={variant === 'primary'
      || variant === 'danger'
      || variant === 'outline'
      || variant === 'disabled'
          ? 'white' : 'black'}
        variant={rebranding ? 'Subtitle18Medium' : 'SubTitle'}
        fontFamily={fonts.euclidCircularSemibold}
      >
        {label}
      </Text>
    </ButtonContainer>
  );
};

Button.defaultProps = {
  label: undefined,
  loading: undefined,
  delay: BUTTON_PRESS_DELAY,
};

export default Button;
