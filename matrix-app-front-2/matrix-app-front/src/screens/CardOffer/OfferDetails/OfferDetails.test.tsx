import { render, waitFor, fireEvent } from 'jest/test-utils';
import React from 'react';
import configureStore from 'redux-mock-store';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import { listOffers, resumeLink } from 'src/mocks/offers';
import axios from 'axios';
import OfferDetails from './OfferDetails';

jest.mock('axios');
xdescribe('OfferDetails Test', () => {
  beforeEach(async () => {
    await axios.get
      .mockResolvedValueOnce({ data: listOffers })
      .mockResolvedValueOnce({ data: resumeLink });
  });

  it('Validate before and after when user accept Terms & Cond', async () => {
    const newStore: any = { ...INITIAL_STORE_MOCK };
    newStore.session = {
      user: {
        email: 'test@test.com',
        name: 'John',
        lastName: 'Doe',
      },
    };
    const store = configureStore()(newStore);
    const { findByTestId } = render(
      <OfferDetails
        navigation={{
          dispatch: jest.fn(),
          goBack: jest.fn(),
          navigate: jest.fn(),
          reset: jest.fn(),
        }}
        route={{
          params: {},
          key: '',
          name: '',
        }}
      />,
      { customStore: store },
    );
    const btnContinue = await findByTestId('btn-continue-get-offer');
    const checkBoxPrivacy = await findByTestId('btn-terms');
    expect(btnContinue.props.accessibilityState.disabled).toBe(true);
    if (checkBoxPrivacy) {
      fireEvent.press(checkBoxPrivacy);
    }
    await waitFor(() => expect(btnContinue.props.accessibilityState.disabled).toBe(false));
  });
});
