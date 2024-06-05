import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import CustomStatusBar from 'src/components/CustomStatusBar/CustomStatusBar';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import {
  Box, Button, SafeAreaBox, Text,
} from 'matrix-ui-components';
import HomeWrapper from 'src/screens/Home/components/HomeWrapper';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import IcoBioMetria from 'assets/svgs/ico-biometria.svg';
import useLivenessIntro from './hooks/useLivenessIntro';

const LivenessIntro = (props: NavigationPropsType) => {
  const { onPressContinue, isLoading, isOnboarding } = useLivenessIntro(props);
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <HomeWrapper>
        <SafeAreaBox flex={1} mx="spacing-m">
          <CustomStatusBar theme="dark" />
          <Box justifyContent="center" flex={1}>
            <Box alignItems="center" mt="spacing-xs" mb="spacing-s">
              <IcoBioMetria />
            </Box>
            {isOnboarding ? (
              <>
                <Text mt="spacing-l" variant="Heading24SemiBold">
                  {i18n.t('kyc-liveness-intro-titles-prepare')}
                </Text>
                <Text variant="Heading24Regular">
                  {i18n.t('kyc-liveness-intro-titles-make-a-video')}
                </Text>
              </>
            ) : (
              <>
                <Text mt="spacing-m" variant="Heading24Regular">
                  {i18n.t('seed.liveness.intro.title-regular')}
                </Text>
                <Text variant="Heading24SemiBold">{i18n.t('seed.liveness.intro.title-bold')}</Text>
              </>
            )}
            <Text mt="spacing-s" variant="body">
              {i18n.t(
                isOnboarding
                  ? 'kyc-liveness-intro-titles-disclosure'
                  : 'seed.liveness.intro.message',
              )}
            </Text>
          </Box>
          <Button
            mb="spacing-m"
            label={i18n.t(isOnboarding ? 'kyc-liveness-intro-start' : 'seed.liveness.intro.start')}
            onPress={onPressContinue}
            disabled={isLoading}
          />
          <LoadingIndicator isVisible={isLoading} />
        </SafeAreaBox>
      </HomeWrapper>
    </ThemeProvider>
  );
};

export default LivenessIntro;
