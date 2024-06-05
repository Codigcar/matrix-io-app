import React from 'react';
import { Text, Button, Box, Modal } from 'matrix-ui-components';
import { CheckDanger, CheckWarning } from 'assets/svgs';
import { SvgProps } from 'react-native-svg';
interface ButtonProps {
  label: string;
  onPress?: () => Promise<void>;
}
interface IModalProps {
  title: string;
  description: string;
  isVisible: boolean;
  onClose?: () => void;
  confirmButton?: ButtonProps;
  cancelButton?: ButtonProps;
  transparent?: boolean;
  type?: 'warning' | 'danger';
}
export const ModalVerifyWallet: React.FC<IModalProps> = ({
  title,
  description,
  isVisible,
  onClose,
  confirmButton,
  cancelButton,
  transparent,
  type,
}) => {
  const renderIcon = (props: SvgProps) => {
    if (type === 'warning') {
      return <CheckWarning {...props} />;
    }
    if (type === 'danger') {
      return <CheckDanger {...props} />;
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
        <Box bg="white" px="spacing-m" py="spacing-m" borderRadius={16}>
          <Box alignItems="center" maxWidth="90%" mt="spacing-s" mb="spacing-xxm">
            {type ? <Box mb="spacing-xm">{renderIcon({ width: 70, height: 70 })}</Box> : null}
            <Text variant="Heading18Medium" textAlign="center" mb="spacing-s">
              {title}
            </Text>
            <Text variant="body14pxRegular" textAlign="center">
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
            <Button variant="secondary" onPress={onClose} label={cancelButton.label} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
ModalVerifyWallet.defaultProps = {
  onClose: undefined,
  confirmButton: undefined,
  cancelButton: undefined,
  transparent: true,
  type: undefined,
};
export default ModalVerifyWallet;
