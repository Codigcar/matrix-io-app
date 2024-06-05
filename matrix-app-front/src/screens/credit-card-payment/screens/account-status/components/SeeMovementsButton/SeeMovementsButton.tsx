import React from 'react';
import { Box, Text } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { TouchableOpacity } from 'react-native';
import DocumentText from 'assets/svgs/document-text.svg';

interface seeMovementsButtonProps {
  navigate: () => void;
  isFirstBillingCycle: boolean;
}

export const SeeMovementsButton = ({ navigate, isFirstBillingCycle }: seeMovementsButtonProps) => (
  <TouchableOpacity
    onPress={() => navigate()}
    testID="viewAccountStatusButton"
  >
    <Box
      backgroundColor={isFirstBillingCycle ? 'disable' : 'primaryDark'}
      borderRadius={8}
      paddingVertical="spacing-xxxs"
      paddingHorizontal="spacing-xs"
      flexDirection="row"
      alignItems="center"
    >
      <DocumentText />
      <Text
        variant="body12Medium"
        color="white"
        marginLeft="spacing-xxs"
      >
        {i18n.t('accountStatus.view-account-status')}
      </Text>
    </Box>
  </TouchableOpacity>
);
