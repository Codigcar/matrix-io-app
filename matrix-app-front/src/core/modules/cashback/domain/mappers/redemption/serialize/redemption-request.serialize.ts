import { serialize } from 'src/core/helpers/transform';
import { RedemptionRequestDto } from 'src/core/modules/cashback/dtos/redemption/redemption-request.dto';
import { IRedemptionRequest } from 'src/core/modules/cashback/dtos/redemption/redemption-request';

const redemptionRequestToDto = (entity: IRedemptionRequest): RedemptionRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      account: validatedEntity.account,
      points: validatedEntity.points,
    }),
    defaultOutput: {} as RedemptionRequestDto,
  });

export default redemptionRequestToDto;
