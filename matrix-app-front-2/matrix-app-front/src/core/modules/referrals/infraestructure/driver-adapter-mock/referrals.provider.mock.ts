import { GetReferralCodeDto } from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.dto';
import { IReferralsRepository } from 'src/core/modules/referrals/repository/referrals.repository';

const GetReferralCodeResponseMock = {
  code: '',
};

class ReferralsProviderMock implements IReferralsRepository {
  public async getReferralCode(): Promise<GetReferralCodeDto> {
    return GetReferralCodeResponseMock;
  }
}

export default ReferralsProviderMock;
