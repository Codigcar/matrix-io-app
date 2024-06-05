import { OnboardingDataScheme } from '../../../dtos/onboarding/get-onboarding-data.dto';
import { IOnboardingData } from '../../../dtos/onboarding/get-onboarding-data.interface';
import { getOnboardingDataToDto } from './get-onboarding-data.serialize';

describe('getOnboardingDataToDto', () => {
  it('should return valid IOnboardingData', () => {
    const onboardingData: IOnboardingData = {
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

    const result = getOnboardingDataToDto(onboardingData);
    expect(OnboardingDataScheme.isValidSync(result)).toBe(true);
    expect(result.account.id).toBe(onboardingData.account.id);
  });
});
