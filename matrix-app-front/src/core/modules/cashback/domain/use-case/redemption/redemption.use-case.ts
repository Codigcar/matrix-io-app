import { IUseCase } from 'src/core/contracts/use-case.interface';
import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import { IRedemption } from '../../../dtos/redemption/redemption';
import { IRedemptionRequest } from '../../../dtos/redemption/redemption-request';
import dtoRedemptionId from '../../mappers/redemption/deserialize/redemption.deserialize';

export class RedemptionUseCase implements IUseCase<IRedemptionRequest, IRedemption> {
  public repository: ICashbackRepository;

  constructor(repository: ICashbackRepository) {
    this.repository = repository;
  }

  public async execute(data: IRedemptionRequest): Promise<IRedemption> {
    const response = await this.repository.redemption(data);
    return dtoRedemptionId(response);
  }
}
