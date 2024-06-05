import { renderHook } from '@testing-library/react-hooks';
import { logCrashlytics } from 'src/utils/Analytics';
import {
  GetBalanceUseCase,
} from 'src/core/modules/credit-card/credit-card-detail/domain';
import { useCreditCardDetailInteractor } from './credit-card-detail.interactor';

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
});
