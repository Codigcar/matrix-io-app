/* eslint-disable max-len */
import React from 'react';
import * as ReactRedux from 'react-redux';
import { render, RenderOptions } from '@testing-library/react-native';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider as ThemeProviderSF } from 'matrix-ui-components';
import { insets } from 'src/mocks/redux';
import { NavigationContainer } from '@react-navigation/native';
import { ModalProvider } from 'src/store/states/modalsContext';
import { NotificationProvider } from 'src/store/states/notificationContext';
import ChallengeProvider from 'src/components/Challenge';
import { Host } from 'react-native-portalize';
import store from 'src/store/store';
import { navigationRef } from 'src/navigators/RootNavigation';

const AllTheProviders: React.FC<{ customStore: any; children: React.ReactElement }> = ({
  children,
  customStore,
}) => (
  <ReactRedux.Provider store={customStore || store}>
    <NavigationContainer ref={navigationRef} onUnhandledAction={() => null}>
      <NativeBaseProvider initialWindowMetrics={insets}>
        <ModalProvider>
          <Host>
            <NotificationProvider>
              <ChallengeProvider>
                <ThemeProviderSF>{children}</ThemeProviderSF>
              </ChallengeProvider>
            </NotificationProvider>
          </Host>
        </ModalProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  </ReactRedux.Provider>
);


const customRender = (ui: React.ReactElement, options?: RenderOptions & { customStore?: any }) =>
  render(ui, {
    wrapper: (props) => <AllTheProviders {...props} customStore={options?.customStore ?? undefined} />,
    ...options,
  });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };
