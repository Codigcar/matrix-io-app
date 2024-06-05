import React from 'react';
import {
  Text, Button, Box, Modal,
} from 'matrix-ui-components';
import { CheckWarning } from 'assets/svgs';
import { s } from 'src/utils/sizes';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../shared/strings/string';
import { InactiveCardModalProps } from '../shared/types/components';

export const InactiveCardModal: React.FC<InactiveCardModalProps> = ({
  isVisible,
  onClose,
  goConfigureButton,
  cancelButton,
  transparent,
  isVirtual,
}) => (
  <Modal
    animationType="fade"
    transparent={transparent}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
      <Box bg="white" px="spacing-m" pt="spacing-m" pb="spacing-xs" borderRadius={s(16)}>
        <Box alignItems="center" maxWidth="94%" px="spacing-xxxs" mt="spacing-s" mb="spacing-xxm">
          <Box mb="spacing-xm">
            <CheckWarning />
          </Box>
          <Text
            variant="Heading18Medium"
            lineHeight={RFValue(21.6)}
            textAlign="center"
            mb="spacing-s"
          >
            {isVirtual
              ? string.physicalCardInactiveVirtualCardModalTitle
              : string.changePinInactivePhysicalCardModalTitle}
          </Text>
          <Text variant="body" textAlign="center" lineHeight={RFValue(19)}>
            {isVirtual
              ? string.physicalCardInactiveVirtualCardModalSubtitle
              : string.changePinInactivePhysicalCardModalSubtitle}
          </Text>
        </Box>
        <Button
          variant="primary"
          mb="spacing-s"
          onPress={goConfigureButton}
          label={string.changePinInactivePhysicalCardModalButtonConfig}
        />
        <Button
          variant="secondary"
          onPress={cancelButton}
          label={string.changePinInactivePhysicalCardModalButtonClose}
        />
      </Box>
    </Box>
  </Modal>
);

InactiveCardModal.defaultProps = {
  onClose: undefined,
  transparent: true,
};

export default InactiveCardModal;
