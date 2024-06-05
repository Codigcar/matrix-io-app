import { GetReferralCodeDto } from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.dto';

export interface IReferralsRepository {
  getReferralCode(): Promise<GetReferralCodeDto>;
}
