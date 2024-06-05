import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, Modal } from 'matrix-ui-components';
import Close from 'assets/svgs/close_outline.svg';
import { BackgroundTransparent } from 'src/components/Backgrounds/BackgroundTransparent';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  title?: string;
}

const OfferAdditionalModal = ({
  isVisible,
  onClose,
  title,
  children,
}: ModalProps) => (
  <Modal
    animationType="fade"
    transparent
    visible={isVisible}
    onRequestClose={() => onClose()}
  >
    {isVisible && <BackgroundTransparent/> }
    <Box flex={1}  justifyContent="flex-end">
      <Box
        padding="spacing-m"
        backgroundColor="white"
        borderTopEndRadius={20}
        borderTopStartRadius={20}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          mb="spacing-s"
          alignItems="center"
        >
          <Text numberOfLines={2} variant="Heading20Medium">
            {title}
          </Text>
          <Pressable onPress={() => onClose()}>
            <Close />
          </Pressable>
        </Box>
        <Box>
          {children}
        </Box>
      </Box>
    </Box>
  </Modal>
);

export default OfferAdditionalModal;
