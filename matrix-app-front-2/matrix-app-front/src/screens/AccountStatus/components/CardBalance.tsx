import React from 'react';
import { s } from 'src/utils/sizes';
import { Box, Text, Theme } from 'matrix-ui-components';
import { BackgroundColorProps, ColorProps } from '@shopify/restyle';
import { SvgProps } from 'react-native-svg';
import BalanceSkeleton from './skeleton/BalanceSkeleton';

interface CardBalanceProps {
  backgroundColor: BackgroundColorProps<Theme>['backgroundColor'];
  label: string;
  isLoading: boolean;
  value: string | number;
  icon: React.FC<SvgProps> | React.ComponentClass,
  testID:string,
  colorValue: ColorProps<Theme>['color'];
  colorLabel: ColorProps<Theme>['color'];
}

const CardBalance:React.FC<CardBalanceProps> = ({
  backgroundColor,
  label,
  value,
  isLoading,
  icon: Icon,
  testID,
  colorLabel,
  colorValue,
}) => (
  <Box
    justifyContent="space-between"
    p="spacing-s"
    borderRadius={16}
    height={s(108)}
    width={s(152)}
    backgroundColor={backgroundColor}
  >
    {isLoading
      ? <BalanceSkeleton isVisible />
      : (
        <>
          <Icon />
          <Text
            variant="Subtitle20SemiBold"
            testID={testID}
            color={colorValue}
          >
            {value}
          </Text>
          <Text
            variant="body"
            color={colorLabel}
          >
            {label}
          </Text>
        </>
      )}
  </Box>
);

export default CardBalance;
