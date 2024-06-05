import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CheckDarkIcon } from 'assets/svgs';
import { Box, Text } from 'matrix-ui-components';

type CheckboxProps = {
  label: string;
  isCheck: boolean;
  onPress?: () => void;
};

export const CheckBox: React.FC<CheckboxProps> = ({
  label,
  onPress,
  isCheck,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <Box flex={1} flexDirection="row" alignItems="center">
      <Box
        borderColor="white"
        borderWidth={1}
        width={24}
        height={24}
        borderRadius={8}
        backgroundColor={isCheck ? 'white' : 'transparent'}
        justifyContent="center"
        alignItems="center"
      >
        <CheckDarkIcon />
      </Box>
      <Box ml="spacing-xxs">
        <Text variant="body14Regular" color="white">
          {label}
        </Text>
      </Box>
    </Box>
  </TouchableOpacity>
);

CheckBox.defaultProps = {
  onPress: undefined,
};

export default CheckBox;
