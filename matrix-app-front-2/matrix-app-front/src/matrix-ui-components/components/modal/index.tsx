import React from 'react';
import { Modal as BaseModal, ModalProps as AllModalProps } from 'react-native';

interface ModalProps extends AllModalProps {
  children: React.ReactNode;
}

export const Modal = ({ children, animationType = 'slide', ...props }: ModalProps) => (
  <BaseModal animationType={animationType} {...props}>
    {children}
  </BaseModal>
);

export default Modal;
