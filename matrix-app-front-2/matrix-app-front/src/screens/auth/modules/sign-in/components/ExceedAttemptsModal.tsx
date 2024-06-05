import { Box, Button, Divider, Modal, Text } from 'matrix-ui-components';
import React, { useContext } from 'react';
import { i18n } from 'src/utils/core/MTXStrings';
import { screenWidth } from 'src/utils/constants';
import { hp } from 'src/utils/sizes';

import { CheckWarning } from 'assets/svgs';
import { ModalContext } from 'src/store/states/modalsContext';

export const ExceedAttemptsModal = () => {
  const { blockLoginModal, updateBlockLoginModal } = useContext(ModalContext);

  const handleCloseModal = () => {
    updateBlockLoginModal(false);
  };

  return (
    <Modal animationType="fade" transparent visible={blockLoginModal}>
      <Box
        alignItems="center"
        backgroundColor="modalBlackWithOpacity"
        flex={1}
        justifyContent="center"
      >
        <Box
          mx="spacing-m"
          pt="spacing-xm"
          pb="spacing-xxm"
          px="spacing-m"
          backgroundColor="white"
          borderRadius={24}
          flexDirection="column"
          alignItems="center"
        >
          <CheckWarning />
          <Divider height={hp(4)} />
          <Text textAlign="center" margin="spacing-xxxs" variant="Heading18Medium">
            {i18n.t('login-failed.exceed-attempts-modal.title')}
          </Text>
          <Divider height={hp(2)} />
          <Text textAlign="center" paddingHorizontal="spacing-xxs" variant="body14Regular">
            {i18n.t('login-failed.exceed-attempts-modal.message')}
          </Text>
          <Divider height={hp(4)} />
          <Button
            width={screenWidth - 124}
            paddingHorizontal="spacing-xxxxs"
            onPress={handleCloseModal}
            label={i18n.t('login-failed.exceed-attempts-modal.continue-button')}
          />
        </Box>
      </Box>
    </Modal>
  );
};

ExceedAttemptsModal.name = 'ExceedAttemptsModal';

export default ExceedAttemptsModal;
