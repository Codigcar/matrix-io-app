import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CARD_IS_INACTIVE, CARD_IS_OPEN, CARD_REQUIRE_CHANGE_PIN } from 'src/utils/constants';
import { CardInfo } from '../../screens/screen-cardInfo';
import { string } from '../../../shared/strings/string';

const mockStore = configureStore();

jest.mock('src/screens/RequestCard/ChangePin/hooks/useChangePin', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoading: false,
    changePin: jest.fn(),
    setForgotPinVisible: jest.fn(),
    forgotPinVisible: false,
    setInactivePhysicalCardModal: jest.fn(),
    inactivePhysicalCardModal: false,
    i2cErrorModal: false,
    setI2cErrorModal: jest.fn(),
    i2cHasErrorDisabled: false,
  })),
}));

describe('CardInfo', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cards: {
        cards: [],
        statusPhysicalCard: { CARD_IS_INACTIVE },
      },
    });
  });

  it('renders correctly when card is open', () => {
    store = mockStore({
      cards: {
        cards: [],
        statusPhysicalCard: { CARD_IS_OPEN },
      },
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CardInfo navigation={{}} />
      </Provider>,
    );

    expect(getByTestId('chip-container')).toBeTruthy();
    expect(getByText(string.cardInfoTitle)).toBeTruthy();
  });

  it('renders correctly when card is inactive', () => {
    store = mockStore({
      cards: {
        cards: [],
        statusPhysicalCard: { CARD_IS_INACTIVE },
      },
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CardInfo navigation={{}} />
      </Provider>,
    );

    expect(getByTestId('chip-container')).toBeTruthy();
    expect(getByText(string.cardInfoTitle)).toBeTruthy();
    expect(getByText(string.cardInfoMessageInactive)).toBeTruthy();
  });

  it('renders correctly when card activation is pending', () => {
    store = mockStore({
      cards: {
        cards: [],
        statusPhysicalCard: { CARD_REQUIRE_CHANGE_PIN },
      },
    });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <CardInfo navigation={{}} />
      </Provider>,
    );

    expect(getByTestId('chip-container')).toBeTruthy();
    expect(getByText(string.cardInfoTitle)).toBeTruthy();
    expect(getByText(string.cardInfoPendingActivate)).toBeTruthy();
  });

  it('triggers changePin function when the button is pressed', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <CardInfo navigation={{}} />
      </Provider>,
    );

    fireEvent.press(getByText(string.cardInfoChangePinButtonText));
  });

  it('displays inactive modal when card is inactive', () => {
    store = mockStore({
      cards: {
        cards: [],
        statusPhysicalCard: { CARD_IS_INACTIVE },
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <CardInfo navigation={{}} />
      </Provider>,
    );

    fireEvent.press(getByText(string.cardInfoChangePinButtonText));
  });
});
