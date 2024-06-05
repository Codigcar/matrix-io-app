/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import * as ReactRedux from 'react-redux';
import { Auth } from 'aws-amplify';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import { act } from 'react-test-renderer';
import LoginScreen from '../sign-in.screen';

jest.mock('axios');
jest.useFakeTimers();
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mappedRequests = {
  '/v1/me/customers/profile': {
    data: {
      data: {
        email_verified: false,
      },
    },
  },
  '/v1/me/onboarding/fulfillment': {
    data: {
      data: {
        code: 'successful_request',
      },
      code: 'successful_request',
    },
  },
  default: {
    data: {
      data: {
        code: 'successful_request',
      },
      user: 'user',
      status: 'ONBOARDING_COMPLETED',
      code: 'successful_request',
    },
  },
};
xdescribe('Get Work Data', () => {
  const signIn = jest.spyOn(Auth, 'signIn');
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
  const navigate = jest.fn();

  const component = (
    <LoginScreen
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
      }}
      route={{
        params: {
          values: {},
        },
        key: '',
        name: '',
      }}
    />
  );

  it('should allow to navigate to next screen when fields are valid', async () => {
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
    mockedAxios.post.mockImplementation(
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
    const button = await findByTestId('submit-login');

    const formData = [
      {
        testID: 'dni',
        content: '72604076',
      },
      {
        testID: 'password',
        content: '12345678',
      },
    ];

    async function fillData(data: typeof formData) {
      for (const field of data) {
        const { testID, content } = field;
        const element = await findByTestId(testID);
        fireEvent.changeText(element, content);
      }
    }

    await act(async () => {
      await fillData(formData);
    });

    fireEvent.press(button);
    await waitFor(() => expect(signIn).toBeCalledWith('72604076', '12345678', { token: '', device: '' }));
  });
});
