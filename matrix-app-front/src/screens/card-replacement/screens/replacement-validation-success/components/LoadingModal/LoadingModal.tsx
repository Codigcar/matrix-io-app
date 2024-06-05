import React from 'react';
import { Text, Box, fonts, Card } from 'matrix-ui-components';
import { Modal } from 'react-native';
import { LoadingModalProps } from 'src/screens/card-replacement/shared/types/component';
import { string } from 'src/screens/card-replacement/shared/strings/string';
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation';

export const LoadingModal: React.FC<LoadingModalProps> = (props) => {
  const { isVisible } = props;
  return (
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
                {string.cardReplacementLoadingModalSubTitle}
              </Text>
              <Text
                variant="label"
                textAlign="center"
                marginTop="spacing-xs"
                marginBottom="spacing-s"
              >
                {string.cardReplacementLoadingModalMessage}
              </Text>
            </Box>
          </Card>
        </Box>
      </Modal>
    </Box>
  );
};
