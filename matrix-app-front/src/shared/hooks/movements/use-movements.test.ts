import { renderHook, act } from '@testing-library/react-hooks';
import { useMovementsInteractor } from 'src/shared/interactors';
import { useSelector } from 'react-redux';
import { IHistoryMovements } from 'src/core/modules/account-status/dtos';
import { useUserSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { useMovementDate } from './use-movements';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('src/shared/interactors', () => ({
  useMovementsInteractor: jest.fn(),
}));

jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
}));

describe('useMovementDate', () => {
  const mockExecuteGetHistoryMovementsByAccountId = jest.fn();
  const accountId = '123';

  beforeEach(() => {
    jest.clearAllMocks();

    (useSelector as jest.Mock).mockImplementation((selector: any) => {
      if (selector === useUserSelectors) {
        return accountId as string;
      }
      return undefined;
    });

    (useMovementsInteractor as jest.Mock).mockReturnValue({
      executeGetHistoryMovementsByAccountId: mockExecuteGetHistoryMovementsByAccountId as (
        id: string,
      ) => Promise<IHistoryMovements[]>,
    });
  });
  it('should fetch and format movements successfully', async () => {
    const mockMovementsData = [{ period: '012022' }];
    mockExecuteGetHistoryMovementsByAccountId.mockResolvedValue(mockMovementsData);

    const { result } = renderHook(() => useMovementDate());

    await act(async () => {
      await result.current.fetchListMovements();
    });

    expect(result.current.loadingMovements).toBe(false);
    expect(result.current.isErrorListMovements).toBe(false);
  });
});
