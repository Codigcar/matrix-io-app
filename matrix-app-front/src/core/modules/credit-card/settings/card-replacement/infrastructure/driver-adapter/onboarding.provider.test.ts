import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import OnboardingProvider from './onboarding.provider';
import { OnboardingDataDto } from '../../dtos/onboarding/get-onboarding-data.dto';

describe('OnboardingProvider', () => {
  let onboardingProvider: OnboardingProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = {
      get: jest.fn(),
      post: jest.fn(),
    } as any;
    onboardingProvider = new OnboardingProvider(mockHttpImpl);
  });

  it('should call httpImpl get and return the response', async () => {
    const mockResponse: OnboardingDataDto = {
      user: {
        documentNumber: '123456789',
        lastName: 'Doe',
        name: 'John',
        location: {
          address: '1234 Main St',
          state: 'NY',
          district: 'New York',
          province: 'New York',
        },
      },
      account: {
        id: '123',
      },
      status: 'active',
    };

    mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

    const result = await onboardingProvider.getOnboardingData();

    expect(mockHttpImpl.get).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });
});
