import React from 'react';
import { Linking } from 'react-native';
import {
  Box, Button, SafeAreaBox, Text,
} from 'matrix-ui-components';
import { CheckWarning } from 'assets/svgs';
import { ios } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const NetworkErrorScreen: React.FC<
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
> = () => {
  const openSettings = () => {
    if (ios) {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} m="spacing-m">
        <Box flex={1} alignItems="center" justifyContent="center">
          <CheckWarning />
          <Box mt="spacing-l" />
          <Text variant="Heading28Medium" textAlign="center">{i18n.t('network-error-title')}</Text>
          <Box mt="spacing-xxm" />
          <Text variant="body14Regular" textAlign="center">{i18n.t('network-error-description')}</Text>
        </Box>
        <Button label={i18n.t('network-error-button-text')} onPress={openSettings} />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default NetworkErrorScreen;
