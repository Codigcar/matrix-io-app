import React from 'react';
import * as ReactRedux from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import {
  fireEvent, render, waitFor,
} from 'jest/test-utils';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import GetPublicWorkConfirmation from './GetPublicWorkConfirmation';

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
      code: 'successful_request',
    },
  },
};
describe('Get Public Work Confirmation', () => {
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
    <GetPublicWorkConfirmation
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
      }}
      route={{
        params: {
          values: {
          },
        },
        key: '',
        name: '',
      }}
    />
  );

  it('should allow to navigate to next screen', async () => {
    mockedAxios.post.mockImplementation((url) => new Promise((resolve) => {
      if (mappedRequests.hasOwnProperty(url)) {
        resolve(mappedRequests[url as keyof typeof mappedRequests]);
      } else {
        resolve(mappedRequests.default);
      }
    }));
    const { findByTestId } = render(component, { customStore: store });
    const button = await findByTestId('submit-public-work-confirmation');
    fireEvent.press(button);
    await waitFor(() => expect(navigate).toBeCalledWith(
      navigationScreenNames.personalDataComplete,
    ));
  });
});
