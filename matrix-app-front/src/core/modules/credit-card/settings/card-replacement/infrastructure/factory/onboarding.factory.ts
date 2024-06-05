import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IOnboardingRepository } from '../../repository/onboarding.repository';
import OnboardingProvider from '../driver-adapter/onboarding.provider';
import OnboardingProviderMock from '../driver-adapter-mock/onboarding.provider.mock';

class OnboardingFactory {
  static getInstance(typeProvider: string = 'provider'): IOnboardingRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new OnboardingProvider();
      case TypeProviderEnum.MOCK:
        return new OnboardingProviderMock();
      default:
        return new OnboardingProvider();
    }
  }
}

export default OnboardingFactory;
