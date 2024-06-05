import {  ResponsiveValue } from '@shopify/restyle';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Box, Text, Theme } from 'src/matrix-ui-components';
interface Props {
  label: string;
  backgroundColor?:  ResponsiveValue<keyof Theme['colors'], Theme>;
}
export const Chip = ({ label, backgroundColor }: Props) => {
  return (
    <Box
      paddingHorizontal={'spacing-xxs'}
      paddingVertical={'spacing-xxs'}
      borderRadius={RFValue(28)}
      alignItems={'center'}
      justifyContent={'center'}
      height={RFValue(24)}
      shadowColor="black"
      backgroundColor={backgroundColor || 'complementaryIndigo600'}
    >
      <Text variant="chipLabel">{label.toUpperCase()}</Text>
    </Box>
  );
};

export default Chip;
