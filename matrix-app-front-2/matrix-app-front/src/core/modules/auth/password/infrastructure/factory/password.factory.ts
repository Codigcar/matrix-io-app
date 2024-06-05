import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import PasswordProvider from '../driver-adapter/password.provider';
import { IPasswordRepository } from '../../repository/password.repository';
import PasswordProviderMock from '../driver-adapter-mock/password.provider.mock';

class PasswordFactory {
  static getInstance(typeProvider: string = 'provider'): IPasswordRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new PasswordProvider();
      case TypeProviderEnum.MOCK:
        return new PasswordProviderMock();
      default:
        return new PasswordProvider();
    }
  }
}

export default PasswordFactory;
