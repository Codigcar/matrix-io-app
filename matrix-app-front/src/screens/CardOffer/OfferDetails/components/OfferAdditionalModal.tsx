import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, Modal } from 'matrix-ui-components';
import { CloseOutlineIcon } from 'assets/svgs';
import { BackgroundTransparent } from 'src/components/Backgrounds/BackgroundTransparent';
import { testID as testIDFile } from '../../shared/strings/testID';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  title?: string;
  testID?: string;
}

const OfferAdditionalModal = ({
  isVisible,
  onClose,
  title,
  children,
  testID,
}: ModalProps) => (
  <Modal
    animationType="fade"
    transparent
    visible={isVisible}
    onRequestClose={() => onClose()}
    testID={testID}
  >
    {isVisible && <BackgroundTransparent /> }
    <Box flex={1} justifyContent="flex-end">
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
          <Pressable testID={testIDFile.closeButtonId} onPress={() => onClose()}>
            <CloseOutlineIcon />
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
