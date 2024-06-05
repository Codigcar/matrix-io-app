/* eslint-disable no-console */
import { AccountStatementsDto, HistoryMovementsDto } from '../../dtos';
import { IAccountStatusRepository } from '../../repository/account-status.repository';

export class AccountStatusProviderMock implements IAccountStatusRepository {
  async getAccountStatementByDateId(): Promise<AccountStatementsDto> {
    console.log('getAccountStatementByDateId');
    return Promise.resolve({
      id: '1234567890',
      url: 'https://www.google.com',
    });
  }

  async getHistoryMovements(): Promise<HistoryMovementsDto> {
    console.log('getHistoryMovements');
    return Promise.resolve([
      {
        id: 'MTA3Mjg4ZjgtNjEyYS00YjYyLTk0NTYtMTM0YzNiYTIzM2RiLzRmMWQ4OGViLTkxY2ItNDY0Yy05NTU5LTliNWMxNjQzMTczYi8yMDIzMDkyOTIwMjMxMDI2LnBkZg==',
        period: '202310',
      },
    ]);
  }
}
