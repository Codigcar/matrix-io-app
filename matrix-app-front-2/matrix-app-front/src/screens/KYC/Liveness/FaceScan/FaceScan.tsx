import React from 'react';
import { StyleSheet, StatusBar, Platform } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
import { NavigationPropsType } from 'src/types/types';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { i18n } from 'src/utils/core/MTXStrings';
import { Box, SafeAreaBox, Text } from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import Background from 'assets/svgs/background-liveness.svg';
import CheckLiveness from 'assets/svgs/tick-circle.svg';
import Mask from 'assets/svgs/mask-face-scan.svg';
import { mvs, s, vs } from 'src/utils/sizes';
import { android } from 'src/utils/constants';
import { logCrashlytics } from 'src/utils/Analytics';
import useFaceScan from './hooks/useFaceScan';
import FaceScanLoading from './components/FaceScanLoading';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

const FaceScan = (props: NavigationPropsType) => {
  const {
    renderCrono,
    renderRecordButton,
    renderStepMessages,
    currentState,
    isStepFinished,
    isFinalStep,
    camera,
    device,
    isLoading,
  } = useFaceScan(props);

  if (!device) {
    logCrashlytics({
      scope: 'SDK',
      fileName: 'screens/KYC/Liveness/FaceScan/FaceScan.tsx',
      service: 'device render',
      error: device,
    });
    return <FaceScanLoading />;
  }

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <StatusBar barStyle="light-content" translucent />
      <Box flex={1} width="100%">
        <SafeAreaBox flex={1}>
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            enableZoomGesture={false}
            video
            orientation="portrait"
            device={device}
            isActive
          />
          <Box style={StyleSheet.absoluteFill}>
            <Background
              height={vs(812) + (StatusBar.currentHeight ?? 0)}
              width={s(375)}
              pointerEvents="none"
              preserveAspectRatio="none"
            />
          </Box>
          <Box
            height={Platform.select({
              android: mvs(137) + (StatusBar.currentHeight ?? 0),
              ios: vs(111),
            })}
          >
            <Text
              mt={android ? 'spacing-ml' : 'spacing-m'}
              variant="Heading20Medium"
              color="white"
              mx="spacing-l"
              textAlign="center"
            >
              {isStepFinished && isFinalStep
                ? i18n.t('seed.liveness.scan.title-finished')
                : i18n.t(renderStepMessages(currentState)?.title)}
            </Text>
            {!isStepFinished && (
              <Text variant="body" color="white" textAlign="center">
                {i18n.t(renderStepMessages(currentState)?.subtitle)}
              </Text>
            )}
          </Box>
          <Box flex={1} width="100%" justifyContent="center" alignItems="center">
            <Box
              opacity={0.9}
              alignItems="center"
              justifyContent="center"
              width={s(345)}
              height={Platform.select({
                android: vs(390) + (StatusBar.currentHeight ?? 0),
                ios: vs(399),
              })}
            >
              <Mask width="100%" height="100%" preserveAspectRatio="none" />
              {isStepFinished && (
                <Box width="100%">
                  <Box
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={-25}
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <CheckLiveness />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Box
            mb="spacing-l"
            mt="spacing-m"
            height={Platform.select({
              android: vs(151) + (StatusBar.currentHeight ?? 0),
              ios: vs(151),
            })}
          >
            <Text
              mt="spacing-m"
              variant="body"
              color="white"
              textAlign="center"
              mx="spacing-l"
              mb="spacing-s"
            >
              {isStepFinished
                ? i18n.t('seed.liveness.scan.message-finished')
                : i18n.t(renderStepMessages(currentState)?.message)}
            </Text>
            <Box mb="spacing-l" justifyContent="flex-end">
              {renderCrono()}
              {renderRecordButton()}
            </Box>
          </Box>
        </SafeAreaBox>
        {isLoading && <LoadingIndicator isVisible={isLoading} />}
      </Box>
    </ThemeProvider>
  );
};

export default FaceScan;
