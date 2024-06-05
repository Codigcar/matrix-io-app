import { IUseCase } from 'src/core/contracts/use-case.interface';

import { IOnboardingData } from '../../../dtos/onboarding/get-onboarding-data.interface';
import { IOnboardingRepository } from '../../../repository/onboarding.repository';
import { getOnboardingDataToDto } from '../../mappers/onboarding/get-onboarding-data.serialize';

class GetOnboardingDataUseCase implements IUseCase<void, IOnboardingData> {
  public repository: IOnboardingRepository;

  constructor(repository: IOnboardingRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IOnboardingData> {
    const response = await this.repository.getOnboardingData();
    return getOnboardingDataToDto(response);
  }
}

export default GetOnboardingDataUseCase;
