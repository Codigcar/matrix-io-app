import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/core/enums/services-instance.enum';
import TransactionApiEnum from 'src/core/enums/services/transaction-api.enum';
import ConstantsEnum from 'src/core/enums/constants.enum';
import { IPaymentMethodRepository } from '../../repository/payment-method.repository';
import { PaymentMethodDto, PaymentMethodRequestDto, PaymentMethodsDto } from '../../dtos';

export class PaymentMethodProvider implements IPaymentMethodRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  setPaymentMethod(data: PaymentMethodRequestDto): Promise<PaymentMethodDto> {
    return this.httpImpl.post(
      ServicesInstanceEnum.API_INSTANCE,
      TransactionApiEnum.PAYMENT_METHOD,
      data,
      ConstantsEnum.JSON,
    );
  }

  getPaymentMethod(): Promise<PaymentMethodsDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      TransactionApiEnum.PAYMENT_METHOD,
      ConstantsEnum.JSON,
    );
  }

  deletePaymentMethod(id: string): Promise<void> {
    const url = `${TransactionApiEnum.PAYMENT_METHOD}/${id}`;
    return this.httpImpl.delete(ServicesInstanceEnum.API_INSTANCE, url);
  }
}
