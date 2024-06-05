import React from 'react';
import {
  Text, Button, Box, Modal,
} from 'matrix-ui-components';
import { FeedbackInformative } from 'assets/svgs';
import { Linking } from 'react-native';
import { CALL_CENTER_NUMBER } from 'src/utils/constants';
import { s } from 'src/utils/sizes';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../shared/strings/string';
import { ForgotPinModalProps } from '../shared/types/components';

export const ForgotPinModal: React.FC<ForgotPinModalProps> = ({
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
              {string.changePinForgotPinModalTitle}
            </Text>
            <Text variant="body" textAlign="center" lineHeight={RFValue(19)}>
              {string.changePinForgotPinModalSubtitle}
            </Text>
          </Box>
          <Button
            testID="forgot-pin-modal-button"
            variant="primary"
            mb="spacing-s"
            onPress={onPressCallCenter}
            label={string.changePinForgotPinModalButton}
          />
          <Button
            variant="secondary"
            onPress={cancelButton}
            label={string.changePinForgotPinModalButtonClose}
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
