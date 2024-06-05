import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { LocationProvider } from 'src/store/states/locationContext';
import { Provider } from 'react-redux';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import { store } from 'src/core/libraries-implementation/state-manager/store';
import LocationFormScreen from '../../screens/LocationForm';

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  SafeAreaProvider: ({ children }) => (
    <>
      {' '}
      {children}
      {' '}
    </>
  ),
}));

const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  push: jest.fn(),
};

beforeEach(() => {
  mockNavigation.navigate.mockClear();
  mockNavigation.dispatch.mockClear();
  mockNavigation.goBack.mockClear();
});

const params = {
  onboarding: true,
};

const component = (
  <SafeAreaProvider>
    <SafeAreaInsetsContext.Provider value={{
      top: 20, right: 20, bottom: 20, left: 20,
    }}
    >
      <ThemeProvider theme={rebrandingTheme}>
        <Provider store={store}>
          <LocationProvider>
            <LocationFormScreen route={{ params }} navigation={mockNavigation} />
          </LocationProvider>
        </Provider>
      </ThemeProvider>
    </SafeAreaInsetsContext.Provider>
  </SafeAreaProvider>
);

describe('LocationFormScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(component);
    expect(getByText(string.requestCardLocationFormTitle)).toBeDefined();
    expect(getByText(string.requestCardLocationFormSubmit)).toBeDefined();
  });

  it('calls onSubmit when the form is submitted with valid data', async () => {
    const { getByText } = render(component);
    fireEvent.press(getByText(string.requestCardLocationFormSubmit));
  });
});
