import React from 'react';
import {
  Text, Button, Box, Modal,
} from 'matrix-ui-components';
import { FeedbackInformative } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { Linking } from 'react-native';
import { CALL_CENTER_NUMBER } from 'src/utils/constants';
import { s } from 'src/utils/sizes';
import { RFValue } from 'react-native-responsive-fontsize';

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  cancelButton: () => void;
  transparent?: boolean;
}

export const ForgotPinModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  cancelButton,
  transparent,
}) => {
  const onPressCallCenter = () => {
    const phoneNumber = CALL_CENTER_NUMBER;
    const telUrl = `tel:${phoneNumber}`;
    Linking.openURL(telUrl);
  };
  return (
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
              <FeedbackInformative />
            </Box>
            <Text
              variant="Heading18SemiBold"
              lineHeight={RFValue(21.6)}
              textAlign="center"
              mb="spacing-sm"
            >
              {i18n.t('change-pin.forgot-pin-modal.title')}
            </Text>
            <Text variant="body" textAlign="center" lineHeight={RFValue(19)}>
              {i18n.t('change-pin.forgot-pin-modal.subtitle')}
            </Text>
          </Box>
          <Button
            variant="primary"
            mb="spacing-s"
            onPress={onPressCallCenter}
            label={i18n.t('change-pin.forgot-pin-modal.button')}
          />
          <Button
            variant="secondary"
            onPress={cancelButton}
            label={i18n.t('change-pin.forgot-pin-modal.button-close')}
          />
        </Box>
      </Box>
    </Modal>
  );
};

ForgotPinModal.defaultProps = {
  onClose: undefined,
  transparent: true,
};

export default ForgotPinModal;
