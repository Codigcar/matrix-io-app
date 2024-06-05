import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import { GetHistoryMovementsByAccountIdUseCase } from 'src/core/modules/account-status/domain';
import { AccountStatusFactory } from 'src/core/modules/account-status/infrastructure';
import { IHistoryMovements } from 'src/core/modules/account-status/dtos';

export const useAccountStatusInteractor = (
  getHistoryMovementsByAccountIdUseCase: IUseCase<
    string,
    IHistoryMovements[]
  > = new GetHistoryMovementsByAccountIdUseCase(AccountStatusFactory.getInstance()),
) => {
  const executeGetHistoryMovementsByAccountId: (
    accountId: string,
  ) => Promise<IHistoryMovements[]> = async (accountId) => {
    try {
      return await getHistoryMovementsByAccountIdUseCase.execute(accountId);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'account-status/account-status.interactor.ts',
        service: 'executeGetHistoryMovementsByAccountId',
        error,
      });

      throw error;
    }
  };

  return {
    executeGetHistoryMovementsByAccountId,
  };
};
