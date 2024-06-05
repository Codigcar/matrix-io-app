import React from 'react';
import { Modal, Box, Text, Button, fonts, ThemeProvider, theme } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { BiometryType, BiometryTypes } from 'react-native-biometrics';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: BiometryType;
  onSubmit?: () => void;
}

const LoginModal = ({ onClose, isOpen, type, onSubmit }: ModalProps) => {
  const factorType = {
    iconName: type === BiometryTypes.FaceID ? 'faceId' : 'touchId',
    message:
      type === BiometryTypes.FaceID
        ? 'biometric-modal.faceId.message'
        : 'biometric-modal.touchId.message',
    submitText:
      type === BiometryTypes.FaceID
        ? 'biometric-modal.faceId.submit'
        : 'biometric-modal.touchId.submit',
  };
  return (
    <Modal animationType="slide" transparent visible={isOpen} onRequestClose={onClose}>
      <Box
        justifyContent="center"
        flex={1}
        backgroundColor="modalWithOpacity"
        paddingHorizontal="spacing-m"
      >
        <Box
          borderRadius={16}
          paddingHorizontal="spacing-m"
          backgroundColor="white"
          paddingVertical="spacing-s"
        >
          <Text
            textAlign="center"
            variant="SubTitle"
            fontFamily={fonts.euclidCircularSemibold}
            mb="spacing-m"
          >
            {i18n.t('biometric-modal.title')}
          </Text>
          <Text
            textAlign="center"
            variant="label"
            fontFamily={fonts.euclidCircularRegular}
            mb="spacing-m"
          >
            {i18n.t(factorType.message)}
          </Text>
          <Box alignItems="center" mb="spacing-s">
            <MtxIcon size="medium" name={factorType.iconName} />
          </Box>
          <Button
            label={i18n.t(factorType.submitText)}
            onPress={onSubmit}
            variant="primary"
            disabled={false}
            mb="spacing-s"
          />
          <Button
            label={i18n.t('biometric-modal.cancel')}
            onPress={onClose}
            variant="info"
            disabled={false}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
