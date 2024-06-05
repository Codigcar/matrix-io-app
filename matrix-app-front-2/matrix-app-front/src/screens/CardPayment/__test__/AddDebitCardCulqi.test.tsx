import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';

import AddDebitCardCulqi from '../AddDebitCardCulqi';
import useErrorsValidation from '../hooks/useErrorsValidation';

const navigateMock = jest.fn();
const goBackMock = jest.fn();

jest.mock('../hooks/useErrorsValidation.ts');
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
      const tokenMessage = { nativeEvent: { data: JSON.stringify({ error: 'error' }) } };
      const getWebview = getByTestId('webviewAddDebitCardCulqi');
      getWebview.props.onMessage(tokenMessage);
    });
    expect(handleErrorMock).toHaveBeenCalledWith('error');
  });

  it('should back when press goback icon', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('BackHeader'));
    expect(goBackMock).toBeCalled();
  });
});
