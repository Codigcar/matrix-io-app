import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import { useErrorsValidation } from 'src/screens/credit-card-payment/shared/hooks';
import { AddDebitCardCulqi } from '../add-debit-card-culqi.screen';

const navigateMock = jest.fn();
const goBackMock = jest.fn();

jest.mock('src/screens/credit-card-payment/shared/hooks');
const useErrorsValidationMock = useErrorsValidation as jest.Mock;
useErrorsValidationMock.mockReturnValue({ handleError: {} });

const component = (
  <AddDebitCardCulqi
    navigation={{
      dispatch: jest.fn(),
      goBack: goBackMock,
      navigate: navigateMock,
      reset: jest.fn(),
      setOptions: jest.fn(),
      push: jest.fn(),
      addListener: jest.fn(),
    }}
    route={{
      params: {},
      key: '',
      name: '',
    }}
  />
);

describe('AddDebitCardCulqi', () => {
  xit('should call AddingPaymentMethod when add card to culqi', async () => {
    const { getByTestId } = render(component);
    await waitFor(() => {
      const tokenMessage = { nativeEvent: { data: JSON.stringify({ token: 'mi-token' }) } };
      const getWebview = getByTestId('webviewAddDebitCardCulqi');
      getWebview.props.onMessage(tokenMessage);
    });
    expect(navigateMock).toHaveBeenCalledWith('AddingPaymentMethod', {
      token: { token: 'mi-token' },
    });
  });

  xit('should call handleError when failing to add card to culqi', async () => {
    const handleErrorMock = jest.fn();
    useErrorsValidationMock.mockReturnValue({ handleError: handleErrorMock });
    const { getByTestId } = render(component);
    await waitFor(() => {
      const tokenMessage = {
        nativeEvent: {
          data: JSON.stringify({
            error: { code: 'someErrorCode', type: 'METODOS_DE_PAGOS' },
          }),
        },
      };
      const getWebview = getByTestId('webviewAddDebitCardCulqi');
      getWebview.props.onMessage(tokenMessage);
    });
    expect(handleErrorMock).toHaveBeenCalledWith({
      code: 'someErrorCode',
      type: 'METODOS_DE_PAGOS',
    });
  });

  it('should back when press goback icon', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('BackHeader'));
    expect(goBackMock).toBeCalled();
  });
});
