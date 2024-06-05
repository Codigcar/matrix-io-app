import React from 'react';
import {
  Text, Button, Box, fonts, Modal, Divider,
} from 'matrix-ui-components';
import Surprise from 'assets/svgs/surprise.svg';

interface ModalProps {
  isVisible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  transparent: boolean;
}

export const SurpriseModal = ({
  isVisible,
  title,
  description,
  onClose,
  confirmButtonLabel,
  cancelButtonLabel,
  transparent,
}: ModalProps) => (
  <Modal animationType="fade" transparent={transparent} visible={isVisible} onRequestClose={onClose}>
    <Box alignItems="center" backgroundColor="modalWithOpacity" flex={1} justifyContent="center">
      <Box
        bg="white"
        paddingHorizontal="spacing-m"
        paddingVertical="spacing-xxs"
        borderRadius={20}
        alignItems="center"
        justifyContent="center"
        margin="spacing-s"
      >
        <Divider height={28} />
        <Surprise />
        <Divider height={28} />
        <Box>
          <Text variant="SubTitle" textAlign="center" fontFamily={fonts.euclidCircularSemibold}>
            {title}
          </Text>
          <Divider height={28} />
          <Text variant="label" textAlign="center" paddingHorizontal="spacing-m">
            {description}
          </Text>
          <Divider height={28} />
          {confirmButtonLabel && (
            <Button
              variant="primary"
              my="spacing-s"
              paddingHorizontal="spacing-xxxxs"
              onPress={onClose}
              label={confirmButtonLabel}
            />
          )}
          {cancelButtonLabel && (
            <Button
              variant="secondary"
              paddingHorizontal="spacing-xxxxs"
              onPress={onClose}
              label={cancelButtonLabel}
            />
          )}
          <Divider height={28} />
        </Box>
      </Box>
    </Box>
  </Modal>
);
SurpriseModal.defaultProps = {
  transparent: true,
};

export default SurpriseModal;
