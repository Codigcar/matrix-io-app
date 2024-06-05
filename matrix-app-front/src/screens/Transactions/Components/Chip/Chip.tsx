import React from 'react';
import { Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CloseIcon } from 'assets/svgs';
import { Box, Text } from 'matrix-ui-components';

interface ChipProps {
  label: string;
  onClose: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onClose }) => (
  <Box
    backgroundColor="complementaryIndigo050"
    borderRadius={RFValue(24)}
    flexDirection="row"
    px="spacing-xxs"
    py="spacing-xxxs"
    alignItems="center"
  >
    <Text variant="body14Regular">{label}</Text>
    <Box ml="spacing-xxxs">
      <Pressable onPress={()=>onClose()}>
        <Box
          backgroundColor="white"
          width={20}
          height={20}
          borderRadius={10}
          alignItems="center"
          justifyContent="center"
        >
          <CloseIcon />
        </Box>
      </Pressable>
    </Box>
  </Box>
);

export default Chip;