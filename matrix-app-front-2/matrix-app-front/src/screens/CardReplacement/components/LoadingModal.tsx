import React from 'react';
import {
  Text, Box, fonts, Card,
} from 'matrix-ui-components';
import { Modal } from 'react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import LoadingAnimation from '../components/LoadingAnimation';

interface ILoadingModalProps {
  isVisible?: boolean;
}

export const LoadingModal = ({ isVisible }: ILoadingModalProps) => (
  <Box flex={1} alignItems="center" justifyContent="center">
    <Modal animationType="slide" transparent visible={isVisible}>
      <Box
        flex={1}
        paddingBottom="spacing-l"
        justifyContent="center"
        alignItems="center"
        backgroundColor="modalWithOpacity"
      >
        <Card marginHorizontal="spacing-m">
          <Box marginHorizontal="spacing-m" marginTop="spacing-xxxs" marginBottom="spacing-xxs">
            <Box alignItems="center" marginBottom="spacing-xxs">
              <LoadingAnimation />
            </Box>
            <Text
              variant="body"
              textAlign="center"
              fontFamily={fonts.euclidCircularSemibold}
              marginHorizontal="spacing-xxs"
              marginVertical="spacing-xxxs"
            >
              {i18n.t('CardReplacement.loading-modal.subtitle')}
            </Text>
            <Text
              variant="label"
              textAlign="center"
              marginTop="spacing-xs"
              marginBottom="spacing-s"
            >
              {i18n.t('CardReplacement.loading-modal.message')}
            </Text>
          </Box>
        </Card>
      </Box>
    </Modal>
  </Box>
);
export default LoadingModal;
