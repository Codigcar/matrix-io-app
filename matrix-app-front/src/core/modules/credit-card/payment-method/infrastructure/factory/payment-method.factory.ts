import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IPaymentMethodRepository } from '../../repository/payment-method.repository';
import { PaymentMethodProvider } from '../driver-adapter/payment-method.provider';
import { PaymentMethodProviderMock } from '../driver-adapter-mock/payment-method.provider.mock';

export class PaymentMethodFactory {
  static getInstance(typeProvider: string = TypeProviderEnum.PROVIDER): IPaymentMethodRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new PaymentMethodProvider();
      case TypeProviderEnum.MOCK:
        return new PaymentMethodProviderMock();
      default:
        return new PaymentMethodProvider();
    }
  }
}
