import React, { useState, useEffect } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { Box, Text } from 'matrix-ui-components';
import { fonts } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { i18n } from 'src/utils/core/MTXStrings';
import MtxIcon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import { Modal } from 'native-base';
import { screenWidth } from 'src/utils/constants';
import Close from 'assets/svgs/close_button.svg';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  type?: string;
  title: string;
  children: React.ReactNode;
}

const FormModal = ({
  onClose, isOpen, type, children, title,
}: Props) => {
  const spacing = type === 'phone' ? 'center' : 'flex-start';
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardWillShowListener.remove();
    };
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box
        flex={1}
        backgroundColor="blackWithOpacity"
        justifyContent={isKeyboardVisible ? spacing : 'flex-end'}
        mb={type === 'phone' && isKeyboardVisible ? 'spacing-xl' : 'spacing-none'}
      >
        <Box
          width={screenWidth}
          padding="spacing-m"
          backgroundColor="white"
          borderTopEndRadius={20}
          borderTopStartRadius={20}
        >
          <Box flexDirection="row" justifyContent="space-between" alignItems="flex-start">
            <Text fontFamily={fonts.robotoSerifRegular} fontSize={20} fontWeight="500" numberOfLines={2}>
              {i18n.t(title)}
            </Text>
            <Pressable onPress={onClose}>
              <Close />
            </Pressable>
          </Box>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default FormModal;
