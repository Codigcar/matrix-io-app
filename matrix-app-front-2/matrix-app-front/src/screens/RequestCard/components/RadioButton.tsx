import React from 'react';
import { Pressable } from 'react-native';
import { Text, Box, fonts } from 'matrix-ui-components';
import RadioButtonEmpty from '../assets/icon/RadioButtonEmpty';
import RadioButtonChecked from '../assets/icon/RadioButtonChecked';

interface Props {
  isSelected: boolean;
  select: () => void;
  value: string;
  indx: number;
}

const RadioButton = ({ isSelected, value, select, indx }: Props) => (
  <>
    <Box my="spacing-xxxs" flexDirection="row" alignItems="center">
      <Pressable onPress={select}>
        {isSelected ? <RadioButtonChecked /> : <RadioButtonEmpty />}
      </Pressable>
      <Text
        numberOfLines={1}
        ml="spacing-xxs"
        variant="body14Regular"
        fontFamily={isSelected ? fonts.outfitSemibold : fonts.outfitRegular}
        color="primaryDarkest"
        my="spacing-xxxs"
        style={{ flexShrink: 1 }}
      >
        {value}
      </Text>
    </Box>
    {indx === 0 ? (
      <Box
        borderColor="disable"
        borderStyle="dashed"
        borderWidth={0.5}
        borderRadius={1}
        my="spacing-xxxs"
      />
    ) : null}
  </>
);

export default RadioButton;
