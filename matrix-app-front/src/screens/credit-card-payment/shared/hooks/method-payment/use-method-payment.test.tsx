/* eslint-disable react/react-in-jsx-scope */
import { renderHook, act } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import {
  deletePaymentMethodFinish,
  setAllCardsPaymentMethods,
  setAllPaymentMethods,
  setIsLoadingDeletePaymentMethod,
} from 'src/core/libraries-implementation/state-manager/states';
import { usePaymentMethodSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { LogoVisa } from 'assets/svgs';
import { usePaymentMethodInteractor } from '../../interactors/payment-method/payment-method.interactor';
import { useMethodPayments } from './use-method-payment';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('src/core/libraries-implementation/state-manager/selectors', () => ({
  usePaymentMethodSelectors: jest.fn(),
}));

jest.mock('../../interactors/payment-method/payment-method.interactor', () => ({
  usePaymentMethodInteractor: jest.fn(),
}));

jest.mock('src/matrix-ui-components/components/toast', () => ({
  showToast: jest.fn(),
  ToastType: {
    Success: 'Success',
    Error: 'Error',
  },
}));

describe('useMethodPayments', () => {
  const mockDispatch = jest.fn();
  const mockExecuteGetPaymentMethods = jest.fn();
  const mockExecuteSetPaymentMethod = jest.fn();
  const mockExecuteDeletePaymentMethod = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (usePaymentMethodInteractor as jest.Mock).mockReturnValue({
      executeGetPaymentMethods: mockExecuteGetPaymentMethods,
      executeSetPaymentMethod: mockExecuteSetPaymentMethod,
      executeDeletePaymentMethod: mockExecuteDeletePaymentMethod,
    });
    (usePaymentMethodSelectors as jest.Mock).mockReturnValue({
      paymentMethods: [
        {
          alias: 'test',
          brand: 'test',
          id: 'test',
          provider: 'test',
          type: 'test',
        },
      ],
      cardsPaymentMethods: [
        {
          cardNumber: 'Visa **** 1234',
          cardType: 'Tarjeta de Crédito',
          cardId: 'card123',
          cardIcon: (props: any) => <LogoVisa {...props} />,
          provider: 'Banco Ejemplo',
        },
      ],
    });
  });

  it('should handle fetching payment methods correctly', async () => {
    const mockResponse = [
      {
        alias: 'test',
        brand: 'test',
        id: 'test',
        provider: 'test',
        type: 'test',
      },
    ];
    mockExecuteGetPaymentMethods.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useMethodPayments());

    await act(async () => {
      await result.current.getPaymentMethods();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should handle deleting payment method correctly', async () => {
    const mockCardId = '123';
    const { paymentMethods, cardsPaymentMethods } = usePaymentMethodSelectors();

    const mockResponsePaymentMethods = paymentMethods.filter((card) => card.id !== mockCardId);
    const mockResponseCardsPaymentMethods = cardsPaymentMethods.filter(
      (card) => card.cardId !== mockCardId,
    );

    mockExecuteDeletePaymentMethod.mockResolvedValue(undefined);

    const { result } = renderHook(() => useMethodPayments());

    await act(async () => {
      await result.current.deletePaymentMethod(mockCardId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setIsLoadingDeletePaymentMethod(true));
    expect(mockExecuteDeletePaymentMethod).toHaveBeenCalledWith(mockCardId);
    expect(mockDispatch).toHaveBeenCalledWith(setAllPaymentMethods(mockResponsePaymentMethods));
    expect(mockDispatch).toHaveBeenCalledWith(
      setAllCardsPaymentMethods(mockResponseCardsPaymentMethods),
    );
    expect(mockDispatch).toHaveBeenCalledWith(deletePaymentMethodFinish(true));
    expect(mockDispatch).toHaveBeenCalledWith(setIsLoadingDeletePaymentMethod(false));
  });

  it('should handle error when deleting payment method fails', async () => {
    const mockCardId = '123';
    const mockError = new Error('Error deleting payment method');
    mockExecuteDeletePaymentMethod.mockRejectedValue(mockError);

    const { result } = renderHook(() => useMethodPayments());

    await act(async () => {
      await result.current.deletePaymentMethod(mockCardId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(setIsLoadingDeletePaymentMethod(true));
    expect(mockExecuteDeletePaymentMethod).toHaveBeenCalledWith(mockCardId);
    expect(mockDispatch).toHaveBeenCalledWith(setIsLoadingDeletePaymentMethod(false));
  });
});
