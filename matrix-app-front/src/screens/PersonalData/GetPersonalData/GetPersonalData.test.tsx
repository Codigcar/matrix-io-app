import React from 'react';
import * as ReactRedux from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import {
  fireEvent, render, waitFor,
} from 'jest/test-utils';
import GetPersonalData from './GetPersonalData';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mappedRequests = {
  '/v1/me/customers/profile': {
    data: {
      data: {
        email_verified: false,
      },
    },
  },
  default: {
    data: {},
  },
};
describe('Get Personal Data', () => {
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
  beforeEach(() => {
    useDispatchMock.mockClear();
  });
  const newStore: any = { ...INITIAL_STORE_MOCK };
  newStore.session = {
    user: {
      email: 'test@test.com',
      name: 'John test',
      lastName: 'Doe',
      location: {
        state: '1',
        province: '2',
        district: '3',
        address: 'address',
      },
    },
  };
  newStore.welcome = {
    giftHasBeenSeen: true,
  };
  const store = configureStore()(newStore);
  const component = (
    <GetPersonalData
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
    />
  );

  it('should allow to navigate to next screen when fields are valid ', async () => {
    mockedAxios.get.mockImplementation((url) => new Promise((resolve) => {
      if (mappedRequests.hasOwnProperty(url)) {
        resolve(mappedRequests[url as keyof typeof mappedRequests]);
      } else {
        resolve(mappedRequests.default);
      }
    }));
    const { findByTestId } = render(component, { customStore: store });
    const button = await findByTestId('submit-personal-data');
    const checkbox = await findByTestId('personal-data-checkbox-confirmation');
    fireEvent.press(checkbox);
    await waitFor(() => expect(button.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(button);
    await waitFor(() => expect(mockedAxios.post.mock.calls.length).toBe(1));
    expect(mockedAxios.post.mock.calls[0][0]).toBe('/v1/me/onboarding/fulfillment/address');
    expect(mockedAxios.post.mock.calls[0][1]).toMatchObject({
      address: 'address', department: '1', district: '3', province: '2',
    });
  });
});
