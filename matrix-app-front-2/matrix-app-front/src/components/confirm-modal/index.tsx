/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Text,
  Button,
  Box,
  Modal,
} from 'matrix-ui-components';
import { CheckDanger, CheckInfo, CheckWarning } from 'assets/svgs';
import { SvgProps } from 'react-native-svg';

interface ButtonProps {
  label: string;
  onPress?: () => void;
}

interface ModalProps {
  title: string;
  description: string;
  isVisible: boolean;
  onClose?: () => void;
  confirmButton?: ButtonProps;
  cancelButton?: ButtonProps;
  transparent?: boolean;
  type?: 'warning' | 'danger' | 'info';
  maxWidth?: string;
  px?: any;
  py?: any;
  borderRadius?: number
}

export const ConfirmModal: React.FC<ModalProps> = ({
  title,
  description,
  isVisible,
  onClose,
  confirmButton,
  cancelButton,
  transparent,
  type,
  maxWidth = '75%',
  px = 'spacing-m',
  py = 'spacing-m',
  borderRadius = 16,
}) => {
  const renderIcon = (props: SvgProps) => {
    if (type === 'warning') {
      return <CheckWarning {...props} />;
    }
    if (type === 'danger') {
      return <CheckDanger {...props} />;
    }
    if (type === 'info') {
      return <CheckInfo {...props} />;
    }
    return null;
  };

  return (
    <Modal
      animationType="fade"
      transparent={transparent}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
        <Box bg="white" px={px} py={py} borderRadius={borderRadius}>
          <Box alignItems="center" maxWidth={maxWidth} px="spacing-m" mt="spacing-s" mb="spacing-xxm">
            {type ? <Box mb="spacing-xm">{renderIcon({ width: 64, height: 64 })}</Box> : null}
            <Text variant="Heading20Medium" textAlign="center" mb="spacing-s">
              {title}
            </Text>
            <Text variant="body" textAlign="center">
              {description}
            </Text>
          </Box>
          {confirmButton && (
            <Button
              variant="primary"
              mb="spacing-s"
              onPress={confirmButton.onPress}
              label={confirmButton.label}
            />
          )}
          {cancelButton && (
            <Button
              variant="secondary"
              onPress={cancelButton.onPress ?? onClose}
              label={cancelButton.label}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

ConfirmModal.defaultProps = {
  onClose: undefined,
  confirmButton: undefined,
  cancelButton: undefined,
  transparent: true,
  type: undefined,
};

export default ConfirmModal;
