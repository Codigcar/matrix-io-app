import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IPaymentMethodRepository } from '../../../repository/payment-method.repository';
import { IPaymentMethod, IPaymentMethodRequest } from '../../../dtos';
import { dtoToPaymentMethod, paymentMethodRequestToDto } from '../../mappers';

export class SetPaymentMethodUseCase implements IUseCase<IPaymentMethodRequest, IPaymentMethod> {
  public repository: IPaymentMethodRepository;

  constructor(repository: IPaymentMethodRepository) {
    this.repository = repository;
  }

  public async execute(data: IPaymentMethodRequest): Promise<IPaymentMethod> {
    // Converts the data from IPaymentMethodRequest to a format suitable for the repository.
    const request = paymentMethodRequestToDto(data);

    // Calls the repository's method to initiate the password recovery.
    const response = await this.repository.setPaymentMethod(request);

    // Converts the repository's response to a "IPaymentMethod" object.
    return dtoToPaymentMethod(response);
  }
}
