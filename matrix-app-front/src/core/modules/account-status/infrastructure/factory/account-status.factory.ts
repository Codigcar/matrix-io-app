import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IAccountStatusRepository } from '../../repository/account-status.repository';
import { AccountStatusProvider } from '../driver-adapter/account-status.provider';
import { AccountStatusProviderMock } from '../driver-adapter-mock/account-status.provider.mock';

export class AccountStatusFactory {
  static getInstance(typeProvider: string = TypeProviderEnum.PROVIDER): IAccountStatusRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new AccountStatusProvider();
      case TypeProviderEnum.MOCK:
        return new AccountStatusProviderMock();
      default:
        return new AccountStatusProvider();
    }
  }
}
