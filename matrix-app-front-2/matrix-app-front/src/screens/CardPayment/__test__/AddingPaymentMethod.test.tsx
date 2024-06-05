import React from 'react';
import configureStore from 'redux-mock-store';
import { render, waitFor } from 'jest/test-utils';

import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import PaymentMethod from 'src/screens/CardPayment/services/getPaymentMethodStatus';
import AddingPaymentMethod from '../AddingPaymentMethod';
import useErrorsValidation from '../hooks/useErrorsValidation';

const newStore: any = { ...INITIAL_STORE_MOCK };
newStore.session = {
  user: {
    email: 'test@test.com',
    name: 'John test',
  },
};

const store = configureStore()(newStore);
const navigate = jest.fn();

jest.mock('../hooks/useErrorsValidation.ts');
const useErrorsValidationMock = useErrorsValidation as jest.Mock;
useErrorsValidationMock.mockReturnValue({ handleError: {} });

const component = (
  <AddingPaymentMethod
    navigation={{
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate,
      reset: jest.fn(),
      setOptions: jest.fn(),
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
  />
);

describe.skip('AddingPaymentMethod screen', () => {
  it('should make toMatchSnapshot', async () => {
    jest.spyOn(PaymentMethod, 'postPaymentMethod').mockResolvedValue(true);
    const { toJSON } = render(component, { customStore: store });
    expect(toJSON()).toMatchSnapshot();
  });

  xit('should navigate to CardPayment screen if the request POST is success ', async () => {
    jest.spyOn(PaymentMethod, 'postPaymentMethod').mockResolvedValue(true);
    render(component, { customStore: store });
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('PaymentError', {
        description:
          'El cobro de la transacción será realizado en soles. Si la cuenta asociada a tu tarjeta débito es en dólares, entonces se utilizará el tipo de cambio del banco de tu tarjeta',
        primaryAction: { label: 'Entendido', nextScreen: 'CardPayment' },
        title: 'Tarjeta de débito agregada con éxito',
        type: 'success',
      });
    });
  });

  it('should call to handleError hook when the request POST is rejected', async () => {
    const handleErrorMock = jest.fn();
    useErrorsValidationMock.mockReturnValue({ handleError: handleErrorMock });
    jest.spyOn(PaymentMethod, 'postPaymentMethod').mockRejectedValue({
      error: {
        code: 'unknown',
        description: 'description',
        user_message: 'user_message',
      },
    });

    render(component, { customStore: store });
    await waitFor(() => {
      expect(handleErrorMock).toHaveBeenCalled();
    });
  });
});
