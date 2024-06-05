import { IUseCase } from 'src/core/contracts/use-case.interface';
import { IReferralsRepository } from 'src/core/modules/referrals/repository/referrals.repository';
import IGetReferralCode from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code';
import dtoToGetReferralCode from 'src/core/modules/referrals/domain/mappers/get-referral-code/get-referral-code-deserialize/get-referral-code.deserialize';

class GetReferralCodeUseCase implements IUseCase<void, IGetReferralCode> {
  public repository: IReferralsRepository;

  constructor(repository: IReferralsRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IGetReferralCode> {
    const response = await this.repository.getReferralCode();
    return dtoToGetReferralCode(response);
  }
}

export default GetReferralCodeUseCase;
