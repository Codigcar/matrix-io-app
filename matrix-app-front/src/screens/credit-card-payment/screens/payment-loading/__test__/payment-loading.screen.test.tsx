import React from 'react';
import { render } from 'jest/test-utils';
import { PaymentLoading } from '../payment-loading.screen';
import { CardPaymentPayload } from '../../../shared/types';

const navigate = jest.fn();

const component = (
  <PaymentLoading
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
        values: {},
        token: {
          token: 'test',
        },
      },
      key: '',
      name: '',
    }}
    cardInfo={{} as any}
    sendPayload={{} as CardPaymentPayload}
  />
);

describe('PaymentLoading screen', () => {
  it('renders the loading state correctly', () => {
    const { getByTestId } = render(component);
    expect(getByTestId('payment-loading')).toBeDefined();
  });
});
