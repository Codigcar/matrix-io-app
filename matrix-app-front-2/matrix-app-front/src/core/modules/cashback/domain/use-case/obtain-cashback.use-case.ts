import { IUseCase } from 'src/core/contracts/use-case.interface';
import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import dtoToObtainCashback from 'src/core/modules/cashback/domain/mappers/obtain-cashback/obtain-cashback-deserialize/obtain-cashback.deserialize';
import IObtainCashback from 'src/core/modules/cashback/dtos/obtain-cashback';

class ObtainCashbackUseCase implements IUseCase<void, IObtainCashback> {
  public repository: ICashbackRepository;

  constructor(repository: ICashbackRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IObtainCashback> {
    const response = await this.repository.obtainCashback();
    return dtoToObtainCashback(response);
  }
}

export default ObtainCashbackUseCase;
