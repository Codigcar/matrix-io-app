import React from 'react';
import { Pressable } from 'react-native';
import { Text, Box, fonts } from 'matrix-ui-components';
import RadioButtonChecked from 'assets/svgs/radio_button_checked.svg';
import RadioButtonEmpty from 'assets/svgs/radio_button_empty.svg';

interface Props {
  isSelected: boolean;
  isDivided: boolean;
  isSelectedBold?: boolean;
  select: () => void;
  value: string;
  index: number;
  numberOfLines?: number;
}

const RadioButton = ({
  isSelected, isDivided = true, isSelectedBold = true, value, select, index, numberOfLines = 1
}: Props) => (
  <>
    <Box my="spacing-xxxs" flexDirection="row" alignItems="center">
      <Pressable onPress={select}>
        {isSelected
          ? <RadioButtonChecked />
          : <RadioButtonEmpty />}
      </Pressable>
      <Text
        numberOfLines={numberOfLines}
        ml="spacing-xxs"
        variant="body14Regular"
        fontFamily={isSelected && isSelectedBold ? fonts.euclidCircularSemibold : fonts.euclidCircularRegular}
        color="primaryDarkest"
        my="spacing-xxxs"
      >
        {value}
      </Text>
    </Box>
    {index === 0 && isDivided ? (
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
