import { UpdateApp } from 'assets/svgs';
import { ThemeProvider } from '@shopify/restyle';
import { Box, Button, Text } from 'matrix-ui-components';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { RFValue } from 'react-native-responsive-fontsize';

export interface ForceUpdateModalProps {
  isOpen: boolean
  onUpdatePress: () => void
}

export interface ForceUpdateVariant {
  minVersion: string;
  suggestedVersion: string;
  url: string;
}

export interface FetchForceUpdate {
  android: ForceUpdateVariant;
  iOS: ForceUpdateVariant;
}

export const ForceUpdateModal: React.FC<ForceUpdateModalProps> = ({ isOpen, onUpdatePress }) => {
  if (!isOpen) return null;

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box position="absolute" top={0} bottom={0} left={0} right={0}>
        <Box
          alignItems="center"
          backgroundColor="modalBlackWithOpacity"
          height="100%"
          width="100%"
          justifyContent="center"
        >
          <Box
            mx="spacing-m"
            pt="spacing-xm"
            pb="spacing-xxm"
            px="spacing-m"
            backgroundColor="white"
            borderRadius={24}
          >
            <Box alignItems="center" marginBottom="spacing-sm">
              <UpdateApp />
            </Box>
            <Text
              textAlign="center"
              marginBottom="spacing-s"
              variant="Heading18Medium"
              fontSize={RFValue(17)}
              lineHeight={RFValue(20.6)}
            >
              {i18n.t('force-update.modal.title')}
            </Text>
            <Text
              textAlign="center"
              marginBottom="spacing-sm"
              variant="body14Regular"
              fontSize={RFValue(13)}
              lineHeight={RFValue(18.6)}
            >
              {i18n.t('force-update.modal.message')}
            </Text>
            <Button
              marginTop="spacing-xxs"
              onPress={onUpdatePress}
              label={i18n.t('force-update.modal.button')}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ForceUpdateModal;
