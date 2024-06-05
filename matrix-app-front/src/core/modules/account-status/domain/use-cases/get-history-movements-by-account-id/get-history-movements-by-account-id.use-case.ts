import { IAccountStatusRepository } from '../../../repository/account-status.repository';
import { IUseCase } from '../../../../../contracts/use-case.interface';
import { dtoToHistoryMovements } from '../../mappers/history-movements/deserialize/history-movements.deserialize';
import { IHistoryMovements } from '../../../dtos';

export class GetHistoryMovementsByAccountIdUseCase
implements IUseCase<string, IHistoryMovements[]> {
  public repository: IAccountStatusRepository;

  constructor(repository: IAccountStatusRepository) {
    this.repository = repository;
  }

  public async execute(accountId: string): Promise<IHistoryMovements[]> {
    const response = await this.repository.getHistoryMovements(accountId);
    return dtoToHistoryMovements(response);
  }
}
