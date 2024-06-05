import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, Modal } from 'matrix-ui-components';
import { CloseOutlineIcon } from 'assets/svgs';

export interface IInfoModalPropsType {
  isVisible: boolean;
  onClose: () => void;
  children?: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
  title?: string;
  showIconClose?: boolean;
  animationType?: 'none' | 'slide' | 'fade' | undefined
}

const InfoModal = ({
  isVisible,
  onClose,
  children,
  title,
  showIconClose = true,
  animationType = 'fade',
}: IInfoModalPropsType) => (
  <Modal
    animationType={animationType}
    transparent
    visible={isVisible}
    onRequestClose={() => onClose()}
  >
    <Box flex={1} backgroundColor="blackWithOpacity" justifyContent="flex-end">
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
          <Text numberOfLines={2} variant="Heading">
            {title}
          </Text>
          {showIconClose ? (
            <Pressable onPress={onClose}>
              <CloseOutlineIcon />
            </Pressable>
          ) : null}
        </Box>
        {children}
      </Box>
    </Box>
  </Modal>
);

export default InfoModal;
