import React from 'react';
import {
  Text, Button, Box, Modal,
} from 'matrix-ui-components';
import { CheckWarning } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { s } from 'src/utils/sizes';
import { RFValue } from 'react-native-responsive-fontsize';

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  goConfigureButton: () => void;
  cancelButton: () => void;
  transparent?: boolean;
  isVirtual: boolean;
}

export const InactiveCardModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  goConfigureButton,
  cancelButton,
  transparent,
  isVirtual,
}) => (
  <Modal
    animationType="fade"
    transparent={transparent}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
      <Box bg="white" px="spacing-m" pt="spacing-m" pb="spacing-xs" borderRadius={s(16)}>
        <Box alignItems="center" maxWidth="94%" px="spacing-xxxs" mt="spacing-s" mb="spacing-xxm">
          <Box mb="spacing-xm">
            <CheckWarning />
          </Box>
          <Text
            variant="Heading18Medium"
            lineHeight={RFValue(21.6)}
            textAlign="center"
            mb="spacing-s"
          >
            {i18n.t(
              isVirtual
                ? 'physical-card.inactive-virtual-card-modal.title'
                : 'change-pin.inactive-physical-card-modal.title',
            )}
          </Text>
          <Text variant="body" textAlign="center" lineHeight={RFValue(19)}>
            {i18n.t(
              isVirtual
                ? 'physical-card.inactive-virtual-card-modal.subtitle'
                : 'change-pin.inactive-physical-card-modal.subtitle',
            )}
          </Text>
        </Box>
        <Button
          variant="primary"
          mb="spacing-s"
          onPress={goConfigureButton}
          label={i18n.t('change-pin.inactive-physical-card-modal.button-config')}
        />
        <Button
          variant="secondary"
          onPress={cancelButton}
          label={i18n.t('change-pin.inactive-physical-card-modal.button-close')}
        />
      </Box>
    </Box>
  </Modal>
);

InactiveCardModal.defaultProps = {
  onClose: undefined,
  transparent: true,
};

export default InactiveCardModal;
