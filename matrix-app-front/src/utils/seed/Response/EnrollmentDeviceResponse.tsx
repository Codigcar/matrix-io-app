import { ThemeProvider } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Text, Button, rebrandingTheme } from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { FeedbackSuccess } from 'assets/svgs';
import { RememberDevice } from 'src/api/AuthServices';
import { onboardingData } from 'src/api/Onboarding';
import { setUserData } from 'src/core/libraries-implementation/state-manager/states';
import { NavigationPropsType } from 'src/types/types';
import { logCrashlytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import { resetNavigation } from 'src/utils/navigationHandler';
import { getDeviceName } from '../deviceInfo';

const EnrollmentDeviceResponse = (props: NavigationPropsType) => {
  const { navigation } = props;
  const goToHome = () => resetNavigation(navigation, 'BottomTabNavigator');
  const dispatch = useDispatch();
  const [device, setDevice] = useState<string>('');

  useEffect(() => {
    const checkOnboardingEvent = async () => {
      try {
        const response = await onboardingData();
        if (response.user) {
          const { name, lastName, documentNumber, location } = response.user;
          const accountId = response?.account?.id;
          const userDataPayload = {
            name,
            lastName,
            documentNumber,
            location,
            accountId,
          };
          dispatch(setUserData(userDataPayload));
        }
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'utils/seed/EnrollmentDeviceResponse.ts',
          service: 'getOnboardingSummary',
          error,
        });
      }
    };
    const setDeviceName = async () => {
      const response = await getDeviceName();
      setDevice(response);
    };
    const setNewDevice = async () => {
      try {
        await RememberDevice();
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'utils/seed/EnrollmentDeviceResponse.ts',
          service: 'rememberNewDevice',
          error,
        });
      }
    };
    setDeviceName();
    checkOnboardingEvent();
    setNewDevice();
  }, []);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container imageBackground={BackgroundNew} isHeaderVisible={false} isScrollable={false}>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box alignItems="center" mb="spacing-l">
            <FeedbackSuccess />
          </Box>
          <Box alignItems="center">
            <Text variant="Heading28Medium" mb="spacing-m" textAlign="center">
              {i18n.t('seed.liveness.response.title')}
            </Text>
            <Text variant="body14Regular" textAlign="center">
              {i18n.t('seed.liveness.response.message', { device })}
              <Text variant="body14SemiBold">{i18n.t('seed.liveness.response.brand')}</Text>
            </Text>
          </Box>
          <Box
            position="absolute"
            bottom={0}
            paddingHorizontal="spacing-m"
            paddingBottom="spacing-l"
            width="100%"
          >
            <Button
              variant="primary"
              onPress={goToHome}
              label={i18n.t('seed.liveness.response.submit')}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EnrollmentDeviceResponse;
