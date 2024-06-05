import React from 'react';
import * as ReactRedux from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { render } from 'jest/test-utils';
import Home from '../Main/Home';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mappedRequests = {
  '/v1/me/customers/profile': {
    data: {
      data: {
        email_verified: false,
      },
    },
  },
  '/v1/me/cards': {
    data: {
      data: [{}],
    },
  },
  default: {
    data: {},
  },
};
jest.useFakeTimers();

describe('Home', () => {
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
  beforeEach(() => {
    useDispatchMock.mockClear();
  });
  const newStore: any = { ...INITIAL_STORE_MOCK };
  newStore.session = {
    user: {
      email: 'test@test.com',
      name: 'John',
      lastName: 'Doe',
    },
  };
  newStore.welcome = {
    giftHasBeenSeen: true,
  };
  newStore.cards = [];
  const store = configureStore()(newStore);
  const component = (
    <Home
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

  it.skip('should show verify modal when user is not verified', async () => {
    mockedAxios.get.mockImplementation(
      (url) =>
        new Promise((resolve) => {
          if (mappedRequests.hasOwnProperty(url)) {
            resolve(mappedRequests[url as keyof typeof mappedRequests]);
          } else {
            resolve(mappedRequests.default);
          }
        }),
    );
    const { findByTestId } = render(component, { customStore: store });

    const labelTag = await findByTestId('user-name-label');
    expect(labelTag.props.children).toContain('John');
  });
});
