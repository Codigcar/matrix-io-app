import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IPaymentRepository } from '../../repository/payment.repository';
import { PaymentProvider } from '../driver-adapter/payment.provider';
import { PaymentProviderMock } from '../driver-adapter-mock/payment.provider.mock';

export class PaymentFactory {
  static getInstance(typeProvider: string = TypeProviderEnum.PROVIDER): IPaymentRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new PaymentProvider();
      case TypeProviderEnum.MOCK:
        return new PaymentProviderMock();
      default:
        return new PaymentProvider();
    }
  }
}
