import React from 'react';
import { Box, Text, KeyboardAvoidingBox } from 'matrix-ui-components';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { CloseButton } from 'assets/svgs/index';
import { i18n } from 'src/utils/core/MTXStrings';
import { ios, screenHeight, screenWidth } from 'src/utils/constants';
import { BgModal } from 'assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { ModalProps } from '../shared/types/components';

const Modal: React.FC<ModalProps> = (props) => {
  const { children, onClose, title } = props;
  return (
    <Box justifyContent="flex-end" flex={1} height="100%" width="100%" position="absolute">
      <ImageBackground source={BgModal} style={StyleSheet.absoluteFill} resizeMode="stretch" />
      <TouchableWithoutFeedback onPress={onClose}>
        <Box position="absolute" width={screenWidth} height={screenHeight} />
      </TouchableWithoutFeedback>
      <KeyboardAvoidingBox
        behavior={ios ? 'padding' : undefined}
        keyboardVerticalOffset={ios ? -30 : 10}
      >
        <Box
          padding="spacing-m"
          backgroundColor="white"
          borderTopRightRadius={RFValue(24)}
          borderTopStartRadius={RFValue(24)}
        >
          <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
            <Text variant="Heading20Medium" numberOfLines={2}>
              {i18n.t(title)}
            </Text>
            <Pressable onPress={onClose}>
              <CloseButton />
            </Pressable>
          </Box>
          {children}
        </Box>
      </KeyboardAvoidingBox>
    </Box>
  );
};

export default Modal;
