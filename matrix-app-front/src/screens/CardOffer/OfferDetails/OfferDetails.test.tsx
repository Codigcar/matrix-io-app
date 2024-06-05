import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@shopify/restyle';
import { listOffers, resumeLink } from 'src/mocks/offers';
import { rebrandingTheme } from 'matrix-ui-components';
import OfferDetails from './OfferDetails';
import useCardOffer from '../hooks/useCardOffer';
import { string } from '../shared/strings/string';
import { testID } from '../shared/strings/testID';

jest.mock('axios');
jest.mock('../hooks/useCardOffer', () => ({
  __esModule: true,
  default: jest.fn(),
  useCardOffer: jest.fn(),
  AlreadyWithOffer: jest.fn(),
}));

const mockNavigate = jest.fn();

const setupComponent = (storeOverrides = {}, useCardOfferOverrides = {}) => {
  const newStore = {
    ...storeOverrides,
  };
  const store = configureStore()(newStore);

  useCardOffer.mockReturnValue({
    offer: listOffers[0],
    loading: {
      type: 'loading',
      visible: false,
    },
    setLoading: jest.fn(),
    submitCardContract: jest.fn(),
    startPolling: jest.fn(),
    name: 'John Doe',
    summarySheet: resumeLink.preSignedUrl,
    ...useCardOfferOverrides,
  });

  const rendered = render(
    <Provider store={store}>
      <ThemeProvider theme={rebrandingTheme}>
        <OfferDetails
          navigation={{
            dispatch: jest.fn(),
            goBack: jest.fn(),
            navigate: mockNavigate,
            reset: jest.fn(),
          }}
          route={{
            params: {},
            key: '',
            name: '',
          }}
        />
      </ThemeProvider>
    </Provider>,
  );
  return rendered;
};

describe('OfferDetails Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get
      .mockResolvedValueOnce({ data: listOffers[0] })
      .mockResolvedValueOnce({ data: resumeLink });
  });

  it('should validate before and after when the user accepts Terms & Cond', async () => {
    const { findByTestId } = setupComponent();
    const btnContinue = await findByTestId(testID.btnContinueGetOffer);
    const checkBoxPrivacy = await findByTestId(testID.btnTermsId);

    expect(btnContinue.props.accessibilityState.disabled).toBe(true);

    fireEvent.press(checkBoxPrivacy);

    await waitFor(() => expect(btnContinue.props.accessibilityState.disabled).toBe(false));
  });

  it('should render correctly with initial state', async () => {
    const { findByText } = setupComponent();
    const userNameText = await findByText('John,');
    expect(userNameText).toBeTruthy();
  });

  it('should navigate to CardDocuments screen when the link is pressed', async () => {
    const { findByText, findByTestId } = setupComponent();
    const checkBoxPrivacy = await findByTestId(testID.btnTermsId);
    fireEvent.press(checkBoxPrivacy);

    const linkText = await findByText(string.cardOfferContractLinkText);
    fireEvent.press(linkText);
    expect(mockNavigate).toHaveBeenCalledWith('CardDocuments', {
      summarySheet: resumeLink.preSignedUrl,
    });
  });

  it('should handle continue button press after accepting terms', async () => {
    const { findByTestId } = setupComponent();
    const checkBoxPrivacy = await findByTestId(testID.btnTermsId);
    fireEvent.press(checkBoxPrivacy);

    const btnContinue = await findByTestId(testID.btnContinueGetOffer);
    fireEvent.press(btnContinue);

    await waitFor(() => expect(useCardOffer({}).submitCardContract).toHaveBeenCalled());
  });
});
