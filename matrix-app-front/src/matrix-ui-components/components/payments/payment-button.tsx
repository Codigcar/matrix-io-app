import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  layout,
  createRestyleComponent,
  spacing,
  spacingShorthand,
  SpacingProps,
  SpacingShorthandProps,
  LayoutProps,
  VariantProps,
  BoxProps,
  BorderProps,
} from '@shopify/restyle';
import { useTheme } from 'matrix-ui-components';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from '../../theme/themes';

const ButtonContainer = createRestyleComponent<
  LayoutProps<Theme> &
    SpacingShorthandProps<Theme> &
    SpacingProps<Theme> &
    BorderProps<Theme> &
    BoxProps<Theme> &
    VariantProps<Theme, 'buttonVariants'> &
    React.ComponentProps<typeof TouchableOpacity>,
  Theme
>([layout, spacing, spacingShorthand], TouchableOpacity);

type PaymentButtonProps = Omit<React.ComponentProps<typeof ButtonContainer>, 'variant'>;

export const PaymentButton: React.FC<PaymentButtonProps> = ({ disabled, children, ...rest }) => {
  const { gradientColors } = useTheme();

  const bgStyles = { ...StyleSheet.absoluteFillObject, borderRadius: 32 };

  return (
    <ButtonContainer
      variant="secondary"
      disabled={disabled}
      height={56}
      minWidth={153}
      justifyContent="center"
      alignItems="center"
      borderRadius={bgStyles.borderRadius}
      {...rest}
    >
      <LinearGradient
        colors={gradientColors.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={bgStyles}
      />
      {children}
    </ButtonContainer>
  );
};

PaymentButton.defaultProps = {};

export default PaymentButton;
