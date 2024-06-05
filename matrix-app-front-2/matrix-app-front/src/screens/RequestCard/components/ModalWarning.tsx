import React from 'react';
import { Text, Button, Box, Modal } from 'matrix-ui-components';
import { CheckWarning } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';

interface ButtonProps {
  onPress?: () => void;
}

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  confirmButton: ButtonProps;
  cancelButton: ButtonProps;
  transparent?: boolean;
}

export const ModalWarningAddress: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  confirmButton,
  cancelButton,
  transparent,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={transparent}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
        <Box bg="white" px="spacing-sm" py="spacing-xxm" borderRadius={16}>
          <Box alignItems="center" maxWidth="83%" px="spacing-sm" mt="spacing-s" mb="spacing-xxm">
            <Box mb="spacing-xm">
              <CheckWarning />
            </Box>
            <Text variant="Heading20Medium" textAlign="center" mb="spacing-s">
              {i18n.t('request-card.error.zone-title-error')}
            </Text>
            <Text variant="body" textAlign="center">
              {i18n.t('request-card.error.zone-message-error')}
            </Text>
          </Box>
          <Button
            variant="primary"
            mb="spacing-s"
            onPress={confirmButton.onPress ?? onClose}
            label={i18n.t('request-card.error.chat-modal-button')}
          />
          <Button
            variant="secondary"
            onPress={cancelButton.onPress ?? onClose}
            label={i18n.t('request-card.error.close-modal-button')}
          />
        </Box>
      </Box>
    </Modal>
  );
};

ModalWarningAddress.defaultProps = {
  onClose: undefined,
  transparent: true,
};

export default ModalWarningAddress;
