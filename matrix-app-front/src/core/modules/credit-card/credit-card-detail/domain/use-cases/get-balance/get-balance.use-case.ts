import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IBalance } from '../../../dtos';
import { dtoToBalances } from '../../mappers';
import { ICreditCardDetailRepository } from '../../../repository/credit-card-detail.repository';

export class GetBalanceUseCase implements IUseCase<void, IBalance> {
  public repository: ICreditCardDetailRepository;

  constructor(repository: ICreditCardDetailRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IBalance> {
    const response = await this.repository.getBalance();
    return dtoToBalances(response)[0];
  }
}
