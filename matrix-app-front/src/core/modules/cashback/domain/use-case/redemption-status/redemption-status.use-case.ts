import { IUseCase } from 'src/core/contracts/use-case.interface';
import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import dtoRedemptionStatus from '../../mappers/redemption-status/deserialize/redemption-status.deserialize';
import { IRedemptionResponse } from '../../../dtos/redemption/redemption-response';

export class RedemptionStatusUseCase implements IUseCase<string, IRedemptionResponse> {
  public repository: ICashbackRepository;

  constructor(repository: ICashbackRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<IRedemptionResponse> {
    const response = await this.repository.redemptionStatus(id);
    return dtoRedemptionStatus(response);
  }
}
