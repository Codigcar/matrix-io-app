import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import {
  Box, Button, SafeAreaBox, Text,
} from 'matrix-ui-components';
import Check from 'assets/lottie/confirmation-check.json';
import AnimatedLottieView from 'lottie-react-native';
import { vs } from 'src/utils/sizes';
import HomeWrapper from 'src/screens/Home/components/HomeWrapper';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import ConfirmModal from 'src/components/confirm-modal';
import usePersonalDataComplete from './hooks/usePersonalComplete';

const PersonalDataComplete = (props: NavigationPropsType) => {
  const {
    isLoading,
    isNotificationModalVisible,
    handleContinuePressButton,
    handleNotificationModalButtonPress,
    closeNotificationModal,
  } = usePersonalDataComplete(props);
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <HomeWrapper>
        <SafeAreaBox mx="spacing-s" flex={1} alignItems="center" justifyContent="center">
          <Box mt="spacing-xxl" mb="spacing-l" width={vs(88)} height={vs(88)}>
            <AnimatedLottieView source={Check} autoPlay loop />
          </Box>
          <Box flex={1} alignItems="center">
            <Text mt="spacing-l" variant="Heading28Medium" mb="spacing-s">
              {i18n.t('personal-data-complete-title')}
            </Text>
            <Text variant="Subtitle18Regular">{i18n.t('personal-data-complete-subtitle')}</Text>
          </Box>
          <Button
            width="100%"
            mb="spacing-m"
            label={i18n.t('button-label-know-offer')}
            variant="primary"
            testID="Continue"
            onPress={handleContinuePressButton}
          />
        </SafeAreaBox>
        <LoadingIndicator isVisible={isLoading} />
        <ConfirmModal
          isVisible={isNotificationModalVisible}
          title={i18n.t('verifyPush.notifications-modal.title')}
          description={i18n.t('verifyPush.notifications-modal.description')}
          confirmButton={{
            label: i18n.t('verifyPush.notifications-modal.confirm-button'),
            onPress: handleNotificationModalButtonPress,
          }}
          cancelButton={{
            label: i18n.t('verifyPush.notifications-modal.close-button'),
            onPress: closeNotificationModal,
          }}
          type="warning"
        />
      </HomeWrapper>
    </ThemeProvider>
  );
};

export default PersonalDataComplete;
