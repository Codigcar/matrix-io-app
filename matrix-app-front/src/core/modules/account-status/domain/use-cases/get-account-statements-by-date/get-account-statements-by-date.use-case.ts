import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IAccountStatusRepository } from '../../../repository/account-status.repository';
import { IAccountStatements, IAccountStatementsRequest } from '../../../dtos';
import { accountStatementsToDto, dtoToAccountStatements } from '../../mappers';

export class GetAccountStatementsByDateUseCase
implements IUseCase<IAccountStatementsRequest, IAccountStatements> {
  public repository: IAccountStatusRepository;

  constructor(repository: IAccountStatusRepository) {
    this.repository = repository;
  }

  public async execute(data: IAccountStatementsRequest): Promise<IAccountStatements> {
    const request = accountStatementsToDto(data);
    const response = await this.repository.getAccountStatementByDateId(request);
    return dtoToAccountStatements(response);
  }
}
