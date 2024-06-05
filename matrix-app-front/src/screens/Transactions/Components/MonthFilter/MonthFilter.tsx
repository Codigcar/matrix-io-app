import React from 'react';
import { Pressable } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Box, Text } from 'src/matrix-ui-components';

type FilterMonthPropsType = {
  label: string;
  isFocus?: boolean;
  onPress?: () => void;
  testID?: string;
};

export const MonthFilter: React.FC<FilterMonthPropsType> = ({
  label, onPress, isFocus, testID,
}) => (
  <Pressable onPress={onPress} testID={testID}>
    <Box
      px="spacing-sm"
      py="spacing-xxxxs"
      borderRadius={RFValue(20)}
      backgroundColor={isFocus ? 'primaryDark' : 'primary100'}
    >
      <Text variant="body14Regular" color={isFocus ? 'white' : 'primary700'}>
        {label}
      </Text>
    </Box>
  </Pressable>
);

MonthFilter.defaultProps = {
  onPress: undefined,
  isFocus: false,
  testID: 'testID',
};

export default MonthFilter;
