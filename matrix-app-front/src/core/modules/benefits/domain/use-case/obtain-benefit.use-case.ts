import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import dtoToObtainBenefit from 'src/core/modules/benefits/domain/mappers/obtain-benefit.deserialize';
import IObtainBenefit from 'src/core/modules/benefits/dtos/obtain-benefit';

class ObtainBenefitUseCase implements IUseCase<void, IObtainBenefit> {
  public repository: IBenefitsRepository;

  constructor(repository: IBenefitsRepository) {
    this.repository = repository;
  }

  public async execute(id: any): Promise<IObtainBenefit> {
    const response = await this.repository.obtainBenefit(id);
    return dtoToObtainBenefit(response);
  }
}

export default ObtainBenefitUseCase;
