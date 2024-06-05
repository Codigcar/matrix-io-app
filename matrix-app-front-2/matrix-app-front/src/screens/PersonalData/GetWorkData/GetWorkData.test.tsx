/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import React from 'react';
import * as ReactRedux from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { act } from 'react-test-renderer';
import GetWorkData from './GetWorkData';

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
describe('Get Work Data', () => {
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
    <GetWorkData
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

    const formData = [
      {
        testID: 'personal-work-data-occupation',
        content: 'test-occupation',
      },
      {
        testID: 'personal-work-data-profession',
        content: 'test-profession',
      },
      {
        testID: 'personal-work-data-workPlace',
        content: 'test-workPlace',
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

    const button = await findByTestId('submit-work-data');
    fireEvent.press(button);
    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.getPublicWorkConfirmation, {
        values: {
          livesInPeru: true,
          occupation: 'test-occupation',
          profession: 'test-profession',
          workPlace: 'test-workPlace',
        },
      }),
    );
  });
});
