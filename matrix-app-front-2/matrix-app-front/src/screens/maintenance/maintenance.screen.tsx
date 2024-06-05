import React from 'react';
import { Maintenance } from 'assets/svgs';
import { Box, SafeAreaBox, Text } from 'matrix-ui-components';

import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';

export const MaintenanceScreen: React.FC<NavigationPropsType> = () => (
  <BackgroundWrapper>
    <SafeAreaBox flex={1} mx="spacing-m" py="spacing-m">
      <Box flex={1} justifyContent="center" alignItems="center">
        <Maintenance />
        <Text variant="Heading28pxMedium" textAlign="center" mt="spacing-l" pt="spacing-xxxxs">
          {i18n.t('maintenance.title')}
        </Text>
        <Text variant="SubTitle18pxRegular" textAlign="center" mt="spacing-m">
          {i18n.t('maintenance.message')}
        </Text>
      </Box>
    </SafeAreaBox>
  </BackgroundWrapper>
);

export default MaintenanceScreen;
