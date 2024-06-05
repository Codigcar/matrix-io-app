import { renderHook, act } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import { useCreditCardDetailInteractor } from 'src/shared/interactors';
import { getOrdersReqError, getOrdersSuccess, getReqOrders } from 'src/core/libraries-implementation/state-manager/states';
import { usePaymentOrder } from './use-payment-order';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('src/shared/interactors', () => ({
  useCreditCardDetailInteractor: jest.fn(),
}));

describe('usePaymentOrder', () => {
  const mockDispatch = jest.fn();
  const mockExecuteGetCCPaymentOrders = jest.fn();
  const initialState = {
    isLoading: false,
    ordersError: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (redux.useSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
    (useCreditCardDetailInteractor as jest.Mock).mockReturnValue({
      executeGetCCPaymentOrders: mockExecuteGetCCPaymentOrders,
    });
  });

  it('should dispatch correct actions on successful payment orders retrieval', async () => {
    const mockOrdersData = { /* mock data for orders */ };
    mockExecuteGetCCPaymentOrders.mockResolvedValue(mockOrdersData);

    const { result } = renderHook(() => usePaymentOrder());
    await act(async () => {
      await result.current.getPaymentOrders();
    });

    expect(mockDispatch).toHaveBeenCalledWith(getReqOrders());
    expect(mockExecuteGetCCPaymentOrders).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(getOrdersSuccess(mockOrdersData));
  });

  it('should dispatch an error action on payment orders retrieval failure', async () => {
    const mockError = new Error('Error fetching payment orders');
    mockExecuteGetCCPaymentOrders.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePaymentOrder());
    await act(async () => {
      await result.current.getPaymentOrders();
    });

    expect(mockDispatch).toHaveBeenCalledWith(getReqOrders());
    expect(mockDispatch).toHaveBeenCalledWith(getOrdersReqError(mockError));
  });
});
