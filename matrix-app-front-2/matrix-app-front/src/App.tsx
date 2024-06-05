import React, { useState, useEffect } from 'react';
import { LogBox, PanResponder } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Amplify } from 'aws-amplify';
import { Host } from 'react-native-portalize';
import { theme } from 'libs/ui-toolkit/styles/';
import awsExports from 'src/utils/aws-exports';
import SplashScreen from 'src/screens/splash/splash';
import { Box, ThemeProvider as ThemeProviderSF, Toast } from 'matrix-ui-components';
import { FlyerInit } from 'src/shared/providers/analytics/implementations/appsflyers/AppFlyerProvider';
import MomentInit from 'src/utils/date-time/date-time';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import useRemoteConfigSetup from 'src/shared/providers/remote-config/provider';
import store from './store/store';
import MainNavigation from './navigators/MainNavigation';
import { SPLASH_ANIMATION_DURATION, rem } from './utils/constants';
import { verifyCredentials, setCredentials, generateCredentials } from './utils/KeyChainHandler';
import PushNotificationsHandler from './utils/notifications/PushNotificationsHandler';
import { ModalProvider } from './store/states/modalsContext';
import { NotificationProvider } from './store/states/notificationContext';
import { DelinquentProvider } from './store/states/delinquentContext';
import ChallengeProvider from './components/Challenge';
import checkActivityApp from './utils/auth/session/checkActivityApp';

LogBox.ignoreLogs(['NativeBase: The contrast ratio of 1:1 for darkText on transparent']);
EStyleSheet.build({
  $rem: rem,
});

Amplify.configure(awsExports);
(() => new PushNotificationsHandler())();

const persistor = persistStore(store);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useRemoteConfigSetup();

  useEffect(() => {
    FlyerInit();
    setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_ANIMATION_DURATION);
  }, []);

  useEffect(() => {
    const verifyKeys = async () => {
      const hasKeys = await verifyCredentials();
      if (!hasKeys) {
        const { key, iv } = await generateCredentials();
        await setCredentials(key, iv);
      }
    };
    verifyKeys();
    MomentInit();
  }, []);

  if (showSplash) {
    return (
      <ThemeProviderSF>
        <SplashScreen />
      </ThemeProviderSF>
    );
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => {
      checkActivityApp();
      return false;
    },
  });
  return (
    <Box flex={1} {...panResponder.panHandlers}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChallengeProvider>
            <ThemeProviderSF>
              <NativeBaseProvider theme={theme}>
                {/* <StorybookUIRoot /> */}
                <ModalProvider>
                  <Host>
                    <NotificationProvider>
                      <DelinquentProvider>
                        <MainNavigation />
                      </DelinquentProvider>
                    </NotificationProvider>
                  </Host>
                </ModalProvider>
                <Toast />
              </NativeBaseProvider>
            </ThemeProviderSF>
          </ChallengeProvider>
        </PersistGate>
      </Provider>
    </Box>
  );
};

export default App;