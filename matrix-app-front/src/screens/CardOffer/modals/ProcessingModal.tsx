import React from 'react';
import { Modal } from 'react-native';
import { Box } from 'matrix-ui-components';
import { BackgroundTransparent } from 'src/components/Backgrounds/BackgroundTransparent';

interface IProcessingModalProps {
  isVisible?: boolean;
  children?: JSX.Element | string;
  testID?: string;
}

export const ProcessingModal: React.FC<IProcessingModalProps> = ({
  isVisible,
  children,
  testID,
}) => (
  <Modal animationType="slide" transparent visible={isVisible} testID={testID}>
    <BackgroundTransparent />
    <Box
      flex={1}
      paddingBottom="spacing-l"
      justifyContent="center"
      alignItems="center"
    >
      { children }
    </Box>
  </Modal>
);

export default ProcessingModal;

ProcessingModal.defaultProps = {
  isVisible: false,
  children: undefined,
  testID: '',
};
