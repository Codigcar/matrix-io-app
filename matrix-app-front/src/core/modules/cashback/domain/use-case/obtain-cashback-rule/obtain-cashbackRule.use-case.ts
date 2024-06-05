import { IUseCase } from 'src/core/contracts/use-case.interface';
import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import dtoToObtainCashbackRule from '../../mappers/obtain-cashback-rule/deserialize/obtain-cashback-rule.deserialize';
import IObtainCashbackRule from '../../../dtos/obtain-cashback-rule/obtain-rules';

class ObtainCashbackRuleUseCase implements IUseCase<void, IObtainCashbackRule> {
  public repository: ICashbackRepository;

  constructor(repository: ICashbackRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IObtainCashbackRule> {
    const response = await this.repository.obtainCashbackRule();
    return dtoToObtainCashbackRule(response);
  }
}

export default ObtainCashbackRuleUseCase;
