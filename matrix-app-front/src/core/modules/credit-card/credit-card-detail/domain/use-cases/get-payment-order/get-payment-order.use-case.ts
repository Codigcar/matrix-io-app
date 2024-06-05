import { IUseCase } from 'src/core/contracts/use-case.interface';
import { ICreditCardDetailRepository } from '../../../repository/credit-card-detail.repository';
import { IPaymentOrder } from '../../../dtos';
import { dtoToPaymentOrders } from '../../mappers';

export class GetPaymentOrdersUseCase implements IUseCase<void, IPaymentOrder[]> {
  public repository: ICreditCardDetailRepository;

  constructor(repository: ICreditCardDetailRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IPaymentOrder[]> {
    const response = await this.repository.getPaymentOrder();
    return dtoToPaymentOrders(response);
  }
}
