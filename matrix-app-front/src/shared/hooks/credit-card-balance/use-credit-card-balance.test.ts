import { renderHook, act } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import { useCreditCardDetailInteractor } from 'src/shared/interactors';
import { useCreditCardBalance } from './use-credit-card-balance';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('src/shared/interactors', () => ({
  useCreditCardDetailInteractor: jest.fn(),
}));

describe('useCreditCardBalance', () => {
  const mockDispatch = jest.fn();
  const mockExecuteGetCCBalance = jest.fn();
  const initialState = {
    isLoading: false,
    balance: [
      {
        available: { amount: 1000 },
        consumed: { amount: 500, details: [{ amount: 500 }] },
        creditLimit: { amount: 2000 },
      },
    ],
    errorServiceBalance: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (redux.useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (redux.useSelector as jest.Mock).mockImplementation((selector) => selector(initialState));
    (useCreditCardDetailInteractor as jest.Mock).mockReturnValue({
      executeGetCCBalance: mockExecuteGetCCBalance,
    });
  });

  it('should dispatch correct actions on successful balance retrieval', async () => {
    const mockBalanceData = { available: 2000, total: 3000 };
    mockExecuteGetCCBalance.mockResolvedValue(mockBalanceData);

    const { result } = renderHook(() => useCreditCardBalance());
    await act(async () => {
      await result.current.getBalance();
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'balance/getReqBalance',
      payload: undefined,
    });
    expect(mockExecuteGetCCBalance).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'balance/getBalanceSuccess',
      payload: mockBalanceData,
    });
  });

  it('should dispatch an error action on balance retrieval failure', async () => {
    const mockError = new Error('Error fetching balance');
    mockExecuteGetCCBalance.mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreditCardBalance());
    await act(async () => {
      await result.current.getBalance();
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'balance/getReqBalance',
      payload: undefined,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'balance/getBalanceReqError',
      payload: mockError,
    });
  });
});
