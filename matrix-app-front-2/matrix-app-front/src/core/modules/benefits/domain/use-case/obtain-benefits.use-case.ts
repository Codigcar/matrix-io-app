import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import dtoToObtainBenefits from 'src/core/modules/benefits/domain/mappers/obtain-benefits.deserialize';
import IObtainBenefits from 'src/core/modules/benefits/dtos/obtain-benefits';

class ObtainBenefitsUseCase implements IUseCase<void, IObtainBenefits> {
  public repository: IBenefitsRepository;

  constructor(repository: IBenefitsRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IObtainBenefits> {
    const response = await this.repository.obtainBenefits();
    return dtoToObtainBenefits(response);
  }
}

export default ObtainBenefitsUseCase;
