import React from 'react';
import { Container, Box, Text, Button, rebrandingTheme } from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { ThemeProvider } from '@shopify/restyle';
import { ConfirmationCheck } from 'assets/lottie';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { string } from '../../shared/strings/string';
import { useReplacementValidationSuccessPresenter } from './replacement-validation-success.presenter';
import { LoadingModal } from './components/LoadingModal/LoadingModal';

export const ReplacementValidationSuccessScreen: React.FC = () => {
  const { loading, onReplacement, userData } = useReplacementValidationSuccessPresenter();
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew}>
        <Box flex={1} my="spacing-xxl" mx="spacing-m" justifyContent="center" alignItems="center">
          <Box alignItems="center" mt="spacing-l" paddingTop="spacing-l" paddingBottom="spacing-s">
            <Box width={RFValue(68)} height={RFValue(68)}>
              <LottieView source={ConfirmationCheck} autoPlay loop />
            </Box>
          </Box>
          <Text my="spacing-xxs" mt="spacing-m" variant="Heading28Medium">
            {string.cardReplacementValidationSuccessTitle}
          </Text>
          <Text mb="spacing-m" variant="Heading28Medium">
            {`${userData.name}!`}
          </Text>
          <Text mt="spacing-sm" mx="spacing-m" variant="body" textAlign="center">
            {string.cardReplacementValidationSuccessContinueMessage}
            <Text variant="Subtitle16Semibold">iO</Text>
          </Text>
          {loading && <LoadingModal isVisible={loading} />}
        </Box>
        <Button
          variant="primary"
          mx="spacing-m"
          mb="spacing-l"
          onPress={onReplacement}
          label={string.cardReplacementValidationSuccessButton}
          disabled={false}
          justifyContent="space-around"
        />
      </Container>
    </ThemeProvider>
  );
};
