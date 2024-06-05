import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CARD_IS_OPEN } from 'src/utils/constants';
import { Store, AnyAction } from '@reduxjs/toolkit';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import ChangePinResponse from '../../screens/ChangePinResponse';

const mockStore = configureStore();

describe('ChangePinResponse', () => {
  let store: Store<any, AnyAction>;
  let mockNavigation: {
    dispatch: Function | jest.Mock<any, any, any>;
    navigate?: Function;
    goBack?: Function;
    reset?: Function;
    setOptions?: Function;
    push?: Function;
  };
  beforeEach(() => {
    store = mockStore({
      cards: {
        statusPhysicalCard: CARD_IS_OPEN,
      },
    });

    mockNavigation = {
      dispatch: jest.fn(),
    };
  });

  it('render screen correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={rebrandingTheme}>
          <ChangePinResponse navigation={{}} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByText(string.changePinChangeSuccessTitle)).toBeTruthy();
    expect(getByText(string.changePinChangeSuccessSubTitle)).toBeTruthy();
    expect(getByText(string.changePinChangeSuccessMessage)).toBeTruthy();
  });

  it('navigates to the home on button press', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={rebrandingTheme}>
          <ChangePinResponse navigation={mockNavigation} route={{}} />
        </ThemeProvider>
      </Provider>,
    );

    fireEvent.press(getByText(string.changePinChangeSuccessSubmit));
  });

  it('renders LottieView component correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ThemeProvider theme={rebrandingTheme}>
          <ChangePinResponse navigation={{}} />
        </ThemeProvider>
      </Provider>,
    );

    expect(getByTestId('lottie-view')).toBeTruthy();
  });
});
