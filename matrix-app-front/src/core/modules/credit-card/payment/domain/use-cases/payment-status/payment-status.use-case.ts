import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPaymentRepository } from '../../../repository/payment.repository';
import { IPaymentStatus } from '../../../dtos';
import { dtoToPaymentStatus } from '../../mappers';

export class PaymentStatusUseCase implements IUseCase<String, IPaymentStatus> {
  public repository: IPaymentRepository;

  constructor(repository: IPaymentRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<IPaymentStatus> {
    const response = await this.repository.getPaymentStatus(id);
    return dtoToPaymentStatus(response);
  }
}
