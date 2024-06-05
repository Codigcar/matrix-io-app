import React from 'react';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import {
  Button, Text, Box, Modal,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';

interface IWarningModalProps {
  closeInfoModal: () => void;
  isLoadingReissues: boolean;
}
const WarningModal = ({ isLoadingReissues, closeInfoModal }: IWarningModalProps) => (
  <Modal animationType="slide" transparent visible={isLoadingReissues} onRequestClose={closeInfoModal}>
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="modalWithOpacity"
    >
      <Box py="spacing-m" px="spacing-s" borderRadius={24} width="90%" backgroundColor="white" justifyContent="center" alignItems="center">
        <Box justifyContent="center" alignItems="center">
          <CheckWarning />
        </Box>
        <Box mt="spacing-s" />
        <Box>
          <Box>
            <Text textAlign="center" variant="Heading18Medium">
              {i18n.t('supports.modal-title')}
            </Text>
          </Box>
          <Box mt="spacing-s" />
          <Box>
            <Text textAlign="center" variant="body14Regular">
              {i18n.t('supports.modal-sub-tittle')}
            </Text>
          </Box>
          <Box mt="spacing-s" />
          <Box>
            <Button
              variant="primary"
              label={i18n.t('supports.modal-button')}
              onPress={closeInfoModal}
              testID="SubmitButton"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  </Modal>
);

export default WarningModal;
