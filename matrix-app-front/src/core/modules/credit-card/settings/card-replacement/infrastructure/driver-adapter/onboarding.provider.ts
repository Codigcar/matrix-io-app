import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import { OnboardingApiEnum } from 'src/core/enums/services/onboarding-api.enum';
import { IOnboardingRepository } from '../../repository/onboarding.repository';
import { IOnboardingData } from '../../dtos/onboarding/get-onboarding-data.interface';

class OnboardingProvider implements IOnboardingRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  async getOnboardingData(): Promise<IOnboardingData> {
    return this.httpImpl.get(ServicesInstanceEnum.API_INSTANCE, OnboardingApiEnum.DATA);
  }
}

export default OnboardingProvider;
