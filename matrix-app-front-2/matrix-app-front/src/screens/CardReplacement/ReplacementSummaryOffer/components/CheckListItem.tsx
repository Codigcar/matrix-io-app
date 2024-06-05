import React from 'react';
import Check from 'assets/svgs/check.svg';
import { Text, fonts, Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';

type CheckListItemPropsType = {
  label: string;
};
const CheckListItem = ({ label }: CheckListItemPropsType) => (
  <Box alignItems="flex-start" flexDirection="row">
    <Box marginRight="spacing-xs" paddingVertical="spacing-xxxs" marginLeft="spacing-xxxs">
      <Check width={RFValue(20)} height={RFValue(20)} />
    </Box>
    <Box>
      <Text
        textAlign="left"
        my="spacing-xxxs"
        variant="label"
        fontFamily={fonts.euclidCircularMedium}
        fontSize={14}
        lineHeight={20}
        color="complementaryIndigo900"
      >
        {label}
      </Text>
    </Box>
  </Box>
);

export default CheckListItem;
