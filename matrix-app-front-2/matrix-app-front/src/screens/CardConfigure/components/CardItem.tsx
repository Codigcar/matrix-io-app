import React from 'react';
import { Box } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { CardItemProps } from '../types/types';

const CardItem: React.FC<CardItemProps> = (props) => {
  const { children, testID } = props;
  return (
    <Box testID={testID} marginHorizontal="spacing-m">
      <Box
        backgroundColor="complementaryPrimary100"
        borderRadius={RFValue(24)}
        paddingVertical="spacing-m"
        paddingHorizontal="spacing-s"
      >
        {children}
      </Box>
    </Box>
  );
};

export default CardItem;
