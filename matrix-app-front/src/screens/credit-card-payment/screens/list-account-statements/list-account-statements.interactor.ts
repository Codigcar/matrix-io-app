import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import {
  IAccountStatements,
  IAccountStatementsRequest,
} from 'src/core/modules/account-status/dtos';
import { AccountStatusFactory } from 'src/core/modules/account-status/infrastructure';
import { GetAccountStatementsByDateUseCase } from 'src/core/modules/account-status/domain';

export const useListAccountInteractor = (
  getAccountStatementsUseCase: IUseCase<
    IAccountStatementsRequest,
    IAccountStatements
  > = new GetAccountStatementsByDateUseCase(AccountStatusFactory.getInstance()),
) => {
  const executeGetAccountStatementByDate = async ({
    dateId,
    isEncrypted,
  }: IAccountStatementsRequest): Promise<IAccountStatements> => {
    try {
      return await getAccountStatementsUseCase.execute({ dateId, isEncrypted });
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CardPayment/Screens/list-account-statements.interactor.tsx',
        service: 'executeGetAccountStatementByDate',
        error,
      });

      throw error;
    }
  };
  return { executeGetAccountStatementByDate };
};
