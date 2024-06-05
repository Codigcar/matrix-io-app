import React from 'react';
import { Text, Box } from 'matrix-ui-components';
import { Check } from 'assets/svgs';
import { RFValue } from 'react-native-responsive-fontsize';

type CheckListItemPropsType = {
  label: string;
  type?: 'medium' | 'regular';
};
const CheckListItem = ({ label, type = 'regular' }: CheckListItemPropsType) => (
  <Box alignItems="flex-start" flexDirection="row">
    <Check width={RFValue(20)} height={RFValue(20)} />
    <Box ml="spacing-xxs">
      <Text
        textAlign="left"
        my="spacing-none"
        variant={type === 'regular' ? 'body14Regular' : 'body14Medium'}
      >
        {label}
      </Text>
    </Box>
  </Box>
);
export default CheckListItem;
