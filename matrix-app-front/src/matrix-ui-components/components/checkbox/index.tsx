import React from 'react';
import { SpacingProps, SpacingShorthandProps, VariantProps } from '@shopify/restyle';
import { GestureResponderEvent, Image, TouchableOpacity } from 'react-native';
import { CheckboxIcon } from 'assets/icons';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { useTheme } from 'matrix-ui-components';
import { AnalyticsProps } from 'src/types/types';
import { Theme } from '../../theme/themes';
import Box from '../box';
import { Text } from '../text';

type Props = SpacingProps<Theme>
  & SpacingShorthandProps<Theme>
  & VariantProps<Theme, 'textVariants'>
  & AnalyticsProps
  & {
    children?: React.ReactNode;
    label?: string;
    isCheck: boolean;
    disabled?: boolean;
    onPress?: (e:GestureResponderEvent) => void;
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
    testID?: string;
  };

export const CheckBox = ({
  children,
  label,
  onPress,
  isCheck,
  alignItems,
  variant,
  disabled,
  testID,
  analytics,
  ...rest
}: Props) => {
  const { rebranding, colors } = useTheme();

  const handlePress = (e:GestureResponderEvent) => {
    if (analytics || (analytics !== false && label)) {
      logVirtualEventAnalytics({
        tipoEvento: isCheck ? 'Desactivar' : 'Activar',
        tipoElemento: 'Checkbox',
        valor: label,
        ...(typeof analytics === 'object' ? analytics : {}),
      });
    }
    onPress?.(e);
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} testID={testID}>
      <Box flexDirection="row" alignItems={alignItems || 'center'} {...rest}>
        <Box
          borderColor="primaryMedium"
          borderWidth={rebranding && isCheck ? 0 : 1}
          width={24}
          height={24}
          backgroundColor={rebranding && isCheck ? 'primary1000' : 'white'}
          borderRadius={8}
          justifyContent="center"
          alignItems="center"
          mb="spacing-xxxxs"
          mr="spacing-xs"
        >
          {
            rebranding
              ? (isCheck && CheckboxIcon) && (
                <Image
                  source={CheckboxIcon}
                  style={{
                    tintColor: colors.primary000,
                  }}
                />
              )
              : (isCheck && CheckboxIcon) && <Image source={CheckboxIcon} />
          }
        </Box>
        {
          !!label
          && (
            <Box flex={1}>
              <Text variant={variant ?? 'label'}>{label}</Text>
            </Box>
          )
        }
        {children}
      </Box>
    </TouchableOpacity>
  );
};

CheckBox.defaultProps = {
  children: undefined,
  label: undefined,
  disabled: false,
  onPress: undefined,
  alignItems: undefined,
  testID: undefined,
};

export default CheckBox;
