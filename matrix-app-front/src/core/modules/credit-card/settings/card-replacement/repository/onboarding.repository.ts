import { OnboardingDataDto } from '../dtos/onboarding/get-onboarding-data.dto';

export interface IOnboardingRepository {
  getOnboardingData(): Promise<OnboardingDataDto>;
}
