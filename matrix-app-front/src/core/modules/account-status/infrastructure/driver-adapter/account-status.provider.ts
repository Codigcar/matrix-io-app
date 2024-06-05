import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/core/enums/services-instance.enum';
import AccountStatusApiEnum from 'src/core/enums/services/account-status-api.enum';
import ConstantsEnum from 'src/core/enums/constants.enum';

import { IAccountStatusRepository } from '../../repository/account-status.repository';
import { AccountStatementsDto, AccountStatementsRequestDto, HistoryMovementsDto } from '../../dtos';

export class AccountStatusProvider implements IAccountStatusRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  async getAccountStatementByDateId(
    request: AccountStatementsRequestDto,
  ): Promise<AccountStatementsDto> {
    const url = `${AccountStatusApiEnum.ACCOUNT_STATEMENTS}/${request.dateId}/download?encrypt=${request.isEncrypted}`;
    return this.httpImpl.get(ServicesInstanceEnum.API_INSTANCE, url, ConstantsEnum.JSON);
  }

  async getHistoryMovements(accountId: string): Promise<HistoryMovementsDto> {
    const url = `${AccountStatusApiEnum.ACCOUNT_STATEMENTS}?accountId=${accountId}`;
    return this.httpImpl.get(ServicesInstanceEnum.API_INSTANCE, url, ConstantsEnum.JSON);
  }
}
