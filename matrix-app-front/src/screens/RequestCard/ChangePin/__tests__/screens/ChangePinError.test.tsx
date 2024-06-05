import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import ChangePinError from '../../screens/ChangePinError';

const mockStore = configureStore();

describe('ChangePinError', () => {
  let store: any;
  let mockNavigation: {
    dispatch: jest.Mock<any, any, any>;
    navigate?: Function;
    goBack?: Function;
    reset?: Function;
    setOptions?: Function;
    push?: Function;
  };

  beforeEach(() => {
    store = mockStore({});
    mockNavigation = { dispatch: jest.fn() };
  });

  it('renders screen correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={rebrandingTheme}>
          <ChangePinError navigation={{}} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText(string.changePingChangeErrorTitle)).toBeTruthy();
    expect(getByText(string.changePinChangeErrorSubTitle)).toBeTruthy();
    expect(getByText(string.changePinChangeErrorMessage)).toBeTruthy();
  });

  it('navigates to the home on button press', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={rebrandingTheme}>
          <ChangePinError navigation={mockNavigation} />
        </ThemeProvider>
      </Provider>,
    );

    fireEvent.press(getByText(string.changePinChangeErrorSubmit));
  });
});
