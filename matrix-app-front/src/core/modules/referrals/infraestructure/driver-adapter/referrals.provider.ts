import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import ServicesEnum from 'src/shared/enums/services.enum';
import { GetReferralCodeDto } from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.dto';
import { IReferralsRepository } from 'src/core/modules/referrals/repository/referrals.repository';

class ReferralsProvider implements IReferralsRepository {
  private httpImpl: HttpImplementation;

  constructor(
    httpImpInstance = new HttpImplementation(),
  ) {
    this.httpImpl = httpImpInstance;
  }

  public async getReferralCode(): Promise<GetReferralCodeDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.REFERRAL_CODE,
    );
  }
}

export default ReferralsProvider;
