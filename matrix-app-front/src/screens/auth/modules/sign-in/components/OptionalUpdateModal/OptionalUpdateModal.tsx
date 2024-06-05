import { OptionalUpdateApp } from 'assets/svgs';
import { ThemeProvider } from '@shopify/restyle';
import {
  Box, Button, Modal, Text,
} from 'matrix-ui-components';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import React from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { BackgroundTransparent } from 'src/components/Backgrounds/BackgroundTransparent';

export interface OptionalUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdatePress: () => void
}

export const OptionalUpdateModal: React.FC<OptionalUpdateModalProps> = ({
  isOpen,
  onClose,
  onUpdatePress,
}) => (
  <ThemeProvider theme={rebrandingTheme}>
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={onClose}
    >
      <BackgroundTransparent />
      <Box
        justifyContent="center"
        flex={1}
        backgroundColor="transparent"
        paddingHorizontal="spacing-m"
      >
        <Box
          pt="spacing-xxxxm"
          pb="spacing-xxm"
          px="spacing-m"
          backgroundColor="white"
          borderRadius={24}
        >
          <Box alignItems="center" marginBottom="spacing-sm">
            <OptionalUpdateApp />
          </Box>
          <Text
            textAlign="center"
            marginBottom="spacing-s"
            variant="Heading18pxMedium"
          >
            {i18n.t('auth:optional-update-modal.title')}
          </Text>
          <Text
            textAlign="center"
            marginBottom="spacing-xxxxm"
            variant="body14pxRegular"
            fontWeight="400"
          >
            {i18n.t('auth:optional-update-modal.message')}
          </Text>
          <Button
            onPress={onUpdatePress}
            label={i18n.t('auth:optional-update-modal.button')}
          />
          <Button
            variant="secondary"
            marginTop="spacing-s"
            onPress={onClose}
            label={i18n.t('auth:optional-update-modal.close')}
          />
        </Box>
      </Box>
    </Modal>
  </ThemeProvider>
);

export default OptionalUpdateModal;
