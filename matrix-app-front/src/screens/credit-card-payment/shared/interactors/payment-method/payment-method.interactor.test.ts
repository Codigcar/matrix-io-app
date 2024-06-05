import { renderHook } from '@testing-library/react-hooks';
import { logCrashlytics } from 'src/utils/Analytics';
import {
  GetBalanceUseCase,
  GetPaymentOrdersUseCase,
} from 'src/core/modules/credit-card/credit-card-detail/domain';
import { useCreditCardDetailInteractor } from 'src/shared/interactors';

jest.mock('src/core/modules/credit-card/credit-card-detail/domain');
jest.mock('src/utils/Analytics');

describe('useCreditCardDetailInteractor', () => {
  it('should successfully execute credit card balance retrieval', async () => {
    const mockBalanceData = { available: 1000, total: 1500 };

    GetBalanceUseCase.prototype.execute = jest.fn().mockResolvedValue(mockBalanceData);

    const { result } = renderHook(() => useCreditCardDetailInteractor());

    const balance = await result.current.executeGetCCBalance();

    expect(balance).toEqual(mockBalanceData);
    expect(GetBalanceUseCase.prototype.execute).toHaveBeenCalled();
  });

  it('should handle an error during credit card balance retrieval', async () => {
    const mockError = new Error('Failed to retrieve credit card balance');

    GetBalanceUseCase.prototype.execute = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreditCardDetailInteractor());

    await expect(result.current.executeGetCCBalance()).rejects.toEqual(mockError);
    expect(logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'shared/interactors/balance.interactor.tsx',
      service: 'executeGetCCBalance',
      error: mockError,
    });
  });

  it('should successfully execute get credit card payment orders', async () => {
    const mockPaymentOrdersData = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ];

    GetPaymentOrdersUseCase.prototype.execute = jest.fn().mockResolvedValue(mockPaymentOrdersData);

    const { result } = renderHook(() => useCreditCardDetailInteractor());

    const paymentOrders = await result.current.executeGetCCPaymentOrders();

    expect(paymentOrders).toEqual(mockPaymentOrdersData);
    expect(GetPaymentOrdersUseCase.prototype.execute).toHaveBeenCalled();
  });

  it('should handle an error during get credit card payment orders execution', async () => {
    const mockError = new Error('Failed to retrieve payment orders');

    GetPaymentOrdersUseCase.prototype.execute = jest.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreditCardDetailInteractor());

    await expect(result.current.executeGetCCPaymentOrders()).rejects.toEqual(mockError);
    expect(logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'shared/interactors/balance.interactor.tsx',
      service: 'executeGetCCPaymentOrders',
      error: mockError,
    });
  });
});
