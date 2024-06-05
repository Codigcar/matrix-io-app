import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import OnboardingFactory from './onboarding.factory';
import OnboardingProvider from '../driver-adapter/onboarding.provider';
import OnboardingProviderMock from '../driver-adapter-mock/onboarding.provider.mock';

jest.mock('../driver-adapter/onboarding.provider');
jest.mock('../driver-adapter-mock/onboarding.provider.mock');

describe('OnboardingFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return OnboardingProvider instance for PROVIDER', () => {
    const instance = OnboardingFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(OnboardingProvider);
  });

  it('should return OnboardingProviderMock instance for MOCK', () => {
    const instance = OnboardingFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(OnboardingProviderMock);
  });

  it('should return OnboardingProvider instance as default', () => {
    const instance = OnboardingFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(OnboardingProvider);
  });
});
