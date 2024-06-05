/* eslint-disable no-console */
import { IOnboardingRepository } from '../../repository/onboarding.repository';
import { IOnboardingData } from '../../dtos/onboarding/get-onboarding-data.interface';

class OnboardingProviderMock implements IOnboardingRepository {
  public async getOnboardingData(): Promise<IOnboardingData> {
    return {
      user: {
        name: 'mockedName',
        lastName: 'mockedLastName',
        documentNumber: 'mockedDocumentNumber',
        location: {
          address: 'mockedAddress',
          state: 'mockedState',
          district: 'mockedDistrict',
          province: 'mockedProvince',
        },
      },
      account: {
        id: 'mockedId',
      },
      status: 'mockedStatus',
    };
  }
}

export default OnboardingProviderMock;
