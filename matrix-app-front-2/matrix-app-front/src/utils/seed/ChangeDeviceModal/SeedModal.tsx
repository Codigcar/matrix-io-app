import React from 'react';
import { Modal, Box, Text, Button, fonts } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  modalType: string;
  name: string | null;
}

const SeedModal = ({ onClose, isOpen, onSubmit, modalType, name }: ModalProps) => {
  const modalText = {
    second_device_not_allowed: {
      title: 'seed.check-device.title',
      message: 'seed.check-device.message',
      submitButton: 'seed.check-device.submit-text',
      cancelButton: 'seed.check-device.cancel-text',
    },
    user_blocked: {
      title: 'userBlocked.login-modal.title',
      message: 'userBlocked.login-modal.message',
      submitButton: 'userBlocked.login-modal.submit-text',
      cancelButton: 'userBlocked.login-modal.cancel-text',
    },
    fraud_blocked: {
      title: 'cardReissue.modal.title',
      message: 'cardReissue.modal.message',
      append: 'app-name',
      submitButton: 'cardReissue.modal.submit-button',
      cancelButton: 'cardReissue.modal.cancel-button',
    },
  };
  return (
    <ThemeProvider theme={rebrandingTheme}>
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
            <Box alignItems="center">
              <CheckWarning />
            </Box>
            <Text
              textAlign="center"
              variant="SubTitle"
              fontFamily={fonts.euclidCircularSemibold}
              color="primaryDarkest"
              mb="spacing-s"
              mt="spacing-m"
            >
              {name
                ? i18n.t(modalText[modalType].title, { name })
                : i18n.t(modalText[modalType].title)}
            </Text>
            <Text textAlign="center" variant="label" mb="spacing-m">
            <Text
              textAlign="center"
              variant="label"
              fontFamily={fonts.euclidCircularRegular}
              color="primaryDarkest"
              mb="spacing-m"
            >
              {i18n.t(modalText[modalType].message)}
            </Text>  
            <Text
              textAlign="justify"
              mt="spacing-s"
              variant="label"
              fontFamily={fonts.euclidCircularRegular}
              fontSize={16}
              fontWeight="bold"
              lineHeight={22}
            >
              {i18n.t(modalText[modalType].append)}
            </Text>
            </Text>
            <Button
              label={i18n.t(modalText[modalType].submitButton)}
              onPress={onSubmit}
              variant="primary"
              disabled={false}
              mb="spacing-s"
            />
            <Button
              label={i18n.t(modalText[modalType].cancelButton)}
              onPress={onClose}
              variant="secondary"
              disabled={false}
            />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default SeedModal;
