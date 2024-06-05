import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPaymentMethodRepository } from '../../../repository/payment-method.repository';

export class DeletePaymentMethodUseCase implements IUseCase<string, void> {
  public repository: IPaymentMethodRepository;

  constructor(repository: IPaymentMethodRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<void> {
    await this.repository.deletePaymentMethod(id);
  }
}
