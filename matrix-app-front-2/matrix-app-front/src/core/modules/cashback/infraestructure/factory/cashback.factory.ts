import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import CashbackProvider from 'src/core/modules/cashback/infraestructure/driver-adapter/cashback.provider';
import CashbackProviderMock from 'src/core/modules/cashback/infraestructure/driver-adapter-mock/cashback.provider.mock';
import { ICashbackRepository } from '../../repository/cashback.repository';

class CashbackFactory {
  static getInstance(typeProvider: string = 'provider'): ICashbackRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new CashbackProvider();
      case TypeProviderEnum.MOCK:
        return new CashbackProviderMock();
      default:
        return new CashbackProvider();
    }
  }
}

export default CashbackFactory;
