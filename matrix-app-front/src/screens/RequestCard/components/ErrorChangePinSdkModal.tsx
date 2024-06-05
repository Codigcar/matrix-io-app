import React from 'react';
import {
  Text, Button, Box, Modal,
} from 'matrix-ui-components';
import { CheckDanger } from 'assets/svgs';
import { s } from 'src/utils/sizes';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../shared/strings/string';
import { ErrorChangePinSdkModalProps } from '../shared/types/components';

export const ErrorChangePinSdkModal: React.FC<ErrorChangePinSdkModalProps> = (props) => {
  const {
    isVisible, onClose, cancelButton, transparent, afterActivate,
  } = props;
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
              <CheckDanger />
            </Box>
            <Text
              variant="Heading18SemiBold"
              lineHeight={RFValue(21.6)}
              textAlign="center"
              mb="spacing-sm"
            >
              {string.changePinSdkErrorModalTitle}
            </Text>
            <Text variant="body" textAlign="center" lineHeight={RFValue(19)}>
              {string.changePinSdkErrorModalSubtitle}
            </Text>
          </Box>
          <Button
            variant="primary"
            mb="spacing-s"
            onPress={cancelButton}
            label={
              afterActivate
                ? string.changePinSdkErrorModalButtonClose2
                : string.changePinSdkErrorModalButtonClose
            }
          />
        </Box>
      </Box>
    </Modal>
  );
};

ErrorChangePinSdkModal.defaultProps = {
  onClose: undefined,
  transparent: true,
};

export default ErrorChangePinSdkModal;
