import React from 'react';
import {
  Text, Button, Box, Modal,
} from 'matrix-ui-components';
import { CheckDanger } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { s } from 'src/utils/sizes';
import { RFValue } from 'react-native-responsive-fontsize';

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  cancelButton: () => void;
  transparent?: boolean;
  afterActivate: boolean;
}

export const ErrorChangePinSdkModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  cancelButton,
  transparent,
  afterActivate,
}) => (
  <Modal
    animationType="fade"
    transparent={transparent}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
      <Box bg="white" px="spacing-m" pt="spacing-m" pb="spacing-xs" borderRadius={s(16)}>
        <Box alignItems="center" maxWidth="85%" px="spacing-xxxs" mt="spacing-s" mb="spacing-xm">
          <Box mb="spacing-xm">
            <CheckDanger />
          </Box>
          <Text
            variant="Heading18SemiBold"
            lineHeight={RFValue(21.6)}
            textAlign="center"
            mb="spacing-sm"
          >
            {i18n.t('change-pin.sdk-error-modal.title')}
          </Text>
          <Text variant="body" textAlign="center" lineHeight={RFValue(19)}>
            {i18n.t('change-pin.sdk-error-modal.subtitle')}
          </Text>
        </Box>
        <Button
          variant="primary"
          mb="spacing-s"
          onPress={cancelButton}
          label={i18n.t(afterActivate ? 'change-pin.sdk-error-modal.button-close-2' : 'change-pin.sdk-error-modal.button-close')}
        />
      </Box>
    </Box>
  </Modal>
);

ErrorChangePinSdkModal.defaultProps = {
  onClose: undefined,
  transparent: true,
};

export default ErrorChangePinSdkModal;
