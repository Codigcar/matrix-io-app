import { AccountStatementsRequestDto } from '../dtos';
import { AccountStatementsDto } from '../dtos/account-statements/account-statements.dto';
import { HistoryMovementsDto } from '../dtos/history-movements/history-movements.dto';

export interface IAccountStatusRepository {
  getAccountStatementByDateId(
    request: AccountStatementsRequestDto,
  ): Promise<AccountStatementsDto>;
  getHistoryMovements(accountId: string): Promise<HistoryMovementsDto>;
}
