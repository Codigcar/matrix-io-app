import React from 'react';
import * as ReactRedux from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import { render } from 'jest/test-utils';
import TransactionDetailScreen from './transactionDetail-screen';

describe('Detail Transaction', () => {
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
  beforeEach(() => {
    useDispatchMock.mockClear();
  });
  const store = configureStore()(INITIAL_STORE_MOCK);
  const navigate = jest.fn();

  const component = (
    <TransactionDetailScreen
      navigation={
        {
          dispatch: jest.fn(),
          goBack: jest.fn(),
          navigate,
          reset: jest.fn(),
        } as any
      }
      route={
        {
          params: {
            transaction: {
              maskedCardNumber: 'test',
              processingDate: '2022-12-12',
              date: '2022-12-12',
              time: '30:00',
              installments: 'test',
              installmentValue: 'test',
              cashback: 'test',
              chargeback: {
                status: 'PROCESSED',
                transactionDate: '2022-12-12',
                description: 'egewrgrw',
                amountTotalTransaction: '1221',
              },
              acceptorNameAndLocation: 'Pago de tarjeta iO',
              totalAmount: {
                formatted: '-$1.00',
              },
            },
          },
        } as any
      }
    />
  );

  it.each`
    testID                       | content
    ${'acceptorNameAndLocation'} | ${'Pago de tarjeta iO'}
    ${'totalAmount'}             | ${'-$1.00'}
  `(
    'should render transaction summary field: $testID should content $content',
    async ({ testID, content }) => {
      const { findByTestId } = render(component, { customStore: store });
      const element = await findByTestId(testID);
      expect(element).toHaveTextContent(content);
    },
  );
});
