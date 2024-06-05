import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/core/enums/services-instance.enum';
import TransactionApiEnum from 'src/core/enums/services/transaction-api.enum';
import ConstantsEnum from 'src/core/enums/constants.enum';
import { IPaymentRepository } from '../../repository/payment.repository';
import { PaymentDto, PaymentRequestDto, PaymentStatusDto } from '../../dtos';

export class PaymentProvider implements IPaymentRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  creditCardPayment(data: PaymentRequestDto): Promise<PaymentDto> {
    return this.httpImpl.post(
      ServicesInstanceEnum.API_INSTANCE,
      TransactionApiEnum.PAYMENTS,
      data,
      ConstantsEnum.JSON,
    );
  }

  getPaymentStatus(id: string): Promise<PaymentStatusDto> {
    const url = `${TransactionApiEnum.PAYMENTS}/${id}`;
    return this.httpImpl.get(ServicesInstanceEnum.API_INSTANCE, url);
  }
}
