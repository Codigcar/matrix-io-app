import React from 'react';
import { Box, Button, Modal, Text } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { CheckWarning } from 'assets/svgs';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ErrorServicesHomeModal = ({ isVisible, onClose }: ModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
        <Box bg="white" px="spacing-m" py="spacing-m" borderRadius={16}>
          <Box alignItems="center" maxWidth="85%" px="spacing-m" mt="spacing-s" mb="spacing-xm">
            <CheckWarning />
            <Text variant="Heading20Medium" textAlign="center" mb="spacing-s" mt="spacing-xm">
              {i18n.t('home-services-errors.title')}
            </Text>
            <Text variant="body" textAlign="center">
              {i18n.t('home-services-errors.subtitle')}
            </Text>
            <Text variant="body" textAlign="center">
              {i18n.t('home-services-errors.message')}
            </Text>
          </Box>
          <Button
            label={i18n.t('home-services-errors.button')}
            variant="primary"
            mb="spacing-s"
            onPress={() => onClose()}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorServicesHomeModal;
