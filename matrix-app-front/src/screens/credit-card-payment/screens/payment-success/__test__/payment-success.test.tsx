import React from 'react';
import { render } from 'jest/test-utils';
import configureStore from 'redux-mock-store';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import { Provider } from 'react-redux';
import { PaymentSuccess } from '../payment-success.screen';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        operationCode: 'value',
        token: {
          token: 'test',
        },
      },
    }),
  };
});

const newStore: any = { ...INITIAL_STORE_MOCK };
newStore.session = {
  user: {
    email: 'test@test.com',
    name: 'John test',
  },
};

const store = configureStore()(newStore);

const navigate = jest.fn();

const component = (
  <Provider store={store}>
    <PaymentSuccess
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
        setOptions: jest.fn(),
        push: jest.fn(),
        addListener: jest.fn(),
      }}
      route={{
        params: {
          operationCode: 'value',
          token: {
            token: 'test',
          },
        },
        key: '',
        name: '',
      }}
    />
  </Provider>
);

describe('PaymentSuccess screen', () => {
  it('render component correctly', () => {
    const { getByTestId } = render(component, { customStore: store });
    expect(getByTestId('payment-success')).toBeDefined();
  });
});
