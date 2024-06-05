import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IReferralsRepository } from 'src/core/modules/referrals/repository/referrals.repository';

import ReferralsProvider from '../driver-adapter/referrals.provider';
import ReferralsProviderMock from '../driver-adapter-mock/referrals.provider.mock';

class ReferralsFactory {
  static getInstance(typeProvider: string = 'provider'): IReferralsRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new ReferralsProvider();
      case TypeProviderEnum.MOCK:
        return new ReferralsProviderMock();
      default:
        return new ReferralsProvider();
    }
  }
}

export default ReferralsFactory;
