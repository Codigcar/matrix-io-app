import { renderHook } from '@testing-library/react-hooks';
import { logCrashlytics } from 'src/utils/Analytics';
import { GetHistoryMovementsByAccountIdUseCase } from 'src/core/modules/account-status/domain';
import { useMovementsInteractor } from './movements.interactor';

jest.mock('src/utils/Analytics');
jest.mock('src/core/modules/account-status/domain');

describe('useMovementsInteractor', () => {
  it('should successfully retrieve history movements by account ID', async () => {
    const mockMovementsData = [
      { id: 1, movement: 'deposit', amount: 500 },
      { id: 2, movement: 'withdrawal', amount: 300 },
    ];

    GetHistoryMovementsByAccountIdUseCase.prototype.execute = jest
      .fn()
      .mockResolvedValue(mockMovementsData);

    const { result } = renderHook(() => useMovementsInteractor());

    const movements = await result.current.executeGetHistoryMovementsByAccountId('account123');

    expect(movements).toEqual(mockMovementsData);
    expect(GetHistoryMovementsByAccountIdUseCase.prototype.execute).toHaveBeenCalledWith(
      'account123',
    );
  });

  it('should handle an error when retrieving history movements', async () => {
    const mockError = new Error('Failed to retrieve history movements');

    GetHistoryMovementsByAccountIdUseCase.prototype.execute = jest
      .fn()
      .mockRejectedValue(mockError);

    const { result } = renderHook(() => useMovementsInteractor());

    await expect(
      result.current.executeGetHistoryMovementsByAccountId('account123'),
    ).rejects.toEqual(mockError);
    expect(logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'shared/interactors/movements/movements.interactor.ts',
      service: 'GetHistoryMovementsByAccountIdUseCase.execute',
      error: mockError,
    });
  });
});
