import React, { useContext } from 'react';
import {
  Text, Button, Box, Modal, fonts,
} from 'matrix-ui-components';
import { CheckWarning } from 'assets/svgs';
import { i18n } from 'src/utils/core/MTXStrings';
import { Linking } from 'react-native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CALL_CENTER_NUMBER } from 'src/utils/constants';
import { NavigationType } from 'src/types/types';
import { ModalContext } from 'src/shared/contexts';

interface FraudBlockModalProps {
  onClose: () => void;
  navigation: NavigationType;
}

const FraudBlockModal = ({ onClose, navigation }: FraudBlockModalProps) => {
  const { fraudBlockModal: showFraudBlockModal } = useContext(ModalContext);
  const onPressCallCenter = () => {
    const phoneNumber = CALL_CENTER_NUMBER;
    const telUrl = `tel:${phoneNumber}`;
    Linking.openURL(telUrl);
  };

  const onPressChatWithExpert = () => {
    onClose();
    navigation.navigate(navigationScreenNames.tabSupport);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={showFraudBlockModal}
      onRequestClose={onClose}
    >
      <Box flex={1} alignItems="center" justifyContent="center" bg="blackWithOpacity">
        <Box bg="white" px="spacing-m" py="spacing-s" borderRadius={16}>
          <Box alignItems="center" maxWidth="85%" px="spacing-xs" mt="spacing-s" mb="spacing-xxm">
            <CheckWarning width={64} height={64} />
            <Text variant="Heading20Medium" textAlign="center" mb="spacing-s" mt="spacing-m">
              {i18n.t('fraudBlockModal.title')}
            </Text>
            <Text variant="body" textAlign="center" mb="spacing-s">
              {i18n.t('fraudBlockModal.first-message-init')}
              <Text fontFamily={fonts.euclidCircularBold} fontSize={13} lineHeight={18}>
                iO
              </Text>
              {i18n.t('fraudBlockModal.first-message-final')}
            </Text>
            <Text variant="body" textAlign="center" my="spacing-xxxs">
              {i18n.t('fraudBlockModal.second-message')}
            </Text>
          </Box>
          <Button
            variant="primary"
            mb="spacing-s"
            onPress={onPressCallCenter}
            label={i18n.t('fraudBlockModal.first-button')}
          />
          <Button
            variant="secondary"
            onPress={onPressChatWithExpert}
            label={i18n.t('fraudBlockModal.second-button')}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default FraudBlockModal;
