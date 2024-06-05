import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPaymentMethodRepository } from '../../../repository/payment-method.repository';
import { IPaymentMethod } from '../../../dtos';
import { dtosToPaymentMethods } from '../../mappers';

export class GetPaymentMethodUseCase implements IUseCase<void, IPaymentMethod[]> {
  public repository: IPaymentMethodRepository;

  constructor(repository: IPaymentMethodRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IPaymentMethod[]> {
    const response = await this.repository.getPaymentMethod();

    // Converts the repository's response to a "IPaymentMethod[]" array.
    return dtosToPaymentMethods(response);
  }
}
