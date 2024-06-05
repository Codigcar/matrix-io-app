import React from 'react';
import { Box, Text } from 'src/matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { FlagIcon } from 'assets/svgs';

const HasNoNotifications: React.FC = () => (
  <Box
    alignItems="center"
    justifyContent="center"
    backgroundColor="primary100"
    borderRadius={16}
    py="spacing-m"
    mx="spacing-m"
    testID='has-no-notifications'
  >
    <Box
      backgroundColor="white"
      width={48}
      height={48}
      alignItems="center"
      justifyContent="center"
      borderRadius={48}
    >
      <FlagIcon />
    </Box>
    <Text
      variant="Subtitle16Semibold"
      mt="spacing-s"
      mx="spacing-l"
    >
      {i18n.t('notification.emptyNotifications')}
    </Text>
  </Box>
);

export default HasNoNotifications;
