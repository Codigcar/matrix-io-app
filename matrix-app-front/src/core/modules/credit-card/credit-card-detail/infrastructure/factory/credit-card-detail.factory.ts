import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { CreditCardDetailProvider } from '../driver-adapter/credit-card-detail.provider';
import { CreditCardDetailProviderMock } from '../driver-adapter-mock/credit-card-detail.provider.mock';
import { ICreditCardDetailRepository } from '../../repository/credit-card-detail.repository';

export class CreditCardDetailFactory {
  static getInstance(
    typeProvider: string = TypeProviderEnum.PROVIDER,
  ): ICreditCardDetailRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new CreditCardDetailProvider();
      case TypeProviderEnum.MOCK:
        return new CreditCardDetailProviderMock();
      default:
        return new CreditCardDetailProvider();
    }
  }
}
