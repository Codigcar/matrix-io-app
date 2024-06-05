/* eslint-env jest */
import {
  GetReferralCodeDto,
  GetReferralCodeSchema,
} from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.dto';
import IGetReferralCode from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.interface';

import dtoToGetReferralCode from './get-referral-code.deserialize';

describe('dtoToGetReferralCode', () => {
  it('should return valid IGetReferralCode with valid input', () => {
    const validDto: GetReferralCodeDto = {
      code: 'LRA55O',
    };

    const result: IGetReferralCode = dtoToGetReferralCode(validDto);

    expect(GetReferralCodeSchema.isValidSync(result)).toBe(true);
    expect(result.code).toBe(validDto.code);
  });
});
