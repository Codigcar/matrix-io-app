import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import { GetHistoryMovementsByAccountIdUseCase } from 'src/core/modules/account-status/domain';
import { IHistoryMovements } from 'src/core/modules/account-status/dtos';
import { AccountStatusFactory } from 'src/core/modules/account-status/infrastructure';

export const useMovementsInteractor = (
  getHistoryMovementsByAccountIdUseCase: IUseCase<
    string,
    IHistoryMovements[]
  > = new GetHistoryMovementsByAccountIdUseCase(AccountStatusFactory.getInstance()),
) => {
  const executeGetHistoryMovementsByAccountId = async (
    accountId: string,
  ): Promise<IHistoryMovements[]> => {
    try {
      return await getHistoryMovementsByAccountIdUseCase.execute(accountId);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'shared/interactors/movements/movements.interactor.ts',
        service: 'GetHistoryMovementsByAccountIdUseCase.execute',
        error,
      });
      throw error;
    }
  };
  return { executeGetHistoryMovementsByAccountId };
};
