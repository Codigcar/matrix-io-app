import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import Alert from '../../components/Alert';
import { string } from '../../shared/strings/string';
import { testID } from '../../shared/strings/testID';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
}));

const mockStore = configureStore([]);

describe('Alert Component Tests', () => {
  const setupComponent = (type = 'warning', onClick = jest.fn()) => {
    const store = mockStore({});
    const rendered = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Provider store={store}>
          <Alert type={type} onClick={onClick} />
        </Provider>
      </ThemeProvider>,
    );
    return rendered;
  };

  it('renders Alert component with warning type', async () => {
    const { getByText, getByTestId } = setupComponent('warning');
    const title = getByText(string.cardOfferModalsWarningAuthorizationTitle);
    const subtitle = getByText(string.cardOfferModalsWarningAuthorizationSubtitle);
    const button = getByTestId(testID.buttonWarningId);

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('renders Alert component with error type', async () => {
    const { getByText, getByTestId } = setupComponent('error');
    const title = getByText(string.cardOfferModalsErrorAuthorizationTitle);
    const subtitle = getByText(string.cardOfferModalsErrorAuthorizationSubtitle);
    const button = getByTestId(testID.buttonWarningId);

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('triggers onClick when the button is pressed', async () => {
    const onClick = jest.fn();
    const { getByTestId } = setupComponent('warning', onClick);
    const button = getByTestId(testID.buttonWarningId);

    fireEvent.press(button);

    await waitFor(() => expect(onClick).toHaveBeenCalled());
  });
});
