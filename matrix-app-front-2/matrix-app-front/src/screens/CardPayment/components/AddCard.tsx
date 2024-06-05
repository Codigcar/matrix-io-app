import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from 'matrix-ui-components';
import { Card } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { AddCardProps } from '../types/types';

const AddCard: React.FC<AddCardProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} testID="addPaymentMethod">
    <Box
      flexDirection="row"
      borderColor="primary500"
      borderWidth={1}
      borderStyle="dashed"
      borderRadius={18}
      alignItems="center"
      p="spacing-s"
      mx="spacing-m"
    >
      <Box
        backgroundColor="primary100"
        padding="spacing-s"
        borderRadius={8}
        mr="spacing-s"
      >
        <Card />
      </Box>
      <Box flex={1}>
        <Text variant="body14pxRegular">{i18n.t('cardPayment.add-credit-card')}</Text>
      </Box>
    </Box>
  </TouchableOpacity>
);

export default AddCard;
