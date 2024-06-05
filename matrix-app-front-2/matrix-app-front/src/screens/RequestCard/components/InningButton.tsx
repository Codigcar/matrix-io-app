import React from 'react';
import { Box, Text, TouchableOpacityBox } from 'matrix-ui-components';

interface InningButtonProps {
  isSelected: boolean;
  buttonText: string;
  onPress: () => void;
}

const InningButton = (props: InningButtonProps) => {
  const { isSelected, buttonText, onPress } = props;
  const bgColor = isSelected ? 'primary1000' : 'primary100';
  const textColor = isSelected ? 'primary000' : 'primary1000';
  return (
    <TouchableOpacityBox onPress={() => onPress()}>
      <Box backgroundColor={bgColor} borderRadius={24} py="spacing-xxs" px="spacing-xxxs" alignItems="center">
        <Text variant="body13Regular" color={textColor}>
          {buttonText}
        </Text>
      </Box>
    </TouchableOpacityBox>
  );
};

export default InningButton;
