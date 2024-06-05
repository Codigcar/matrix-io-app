import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPaymentRepository } from '../../../repository/payment.repository';
import { IPayment, IPaymentRequest } from '../../../dtos';
import { dtoToPayment, paymentRequestToDto } from '../../mappers';

export class PaymentUseCase implements IUseCase<IPaymentRequest, IPayment> {
  public repository: IPaymentRepository;

  constructor(repository: IPaymentRepository) {
    this.repository = repository;
  }

  public async execute(data: IPaymentRequest): Promise<IPayment> {
    const request = paymentRequestToDto(data);
    const response = await this.repository.creditCardPayment(request);
    return dtoToPayment(response);
  }
}
