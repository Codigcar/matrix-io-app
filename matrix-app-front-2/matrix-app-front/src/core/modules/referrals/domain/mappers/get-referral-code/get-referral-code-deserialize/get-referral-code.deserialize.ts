import { deserialize } from 'src/core/helpers/transform';
import { GetReferralCodeDto, GetReferralCodeSchema } from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.dto';
import IGetReferralCode from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code';

const dtoToGetReferralCode = (dto: GetReferralCodeDto): IGetReferralCode =>
  deserialize(dto, {
    outputSchema: GetReferralCodeSchema,
    serializationLogic: (validatedDto) => ({
      code: validatedDto?.code || '',
    }),
    defaultOutput: {} as GetReferralCodeDto,
  });

export default dtoToGetReferralCode;
