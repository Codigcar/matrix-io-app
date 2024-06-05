import { serialize } from 'src/core/helpers/transform';
import { RedemptionDto } from 'src/core/modules/cashback/dtos/redemption/redemption.dto';
import { IRedemption } from 'src/core/modules/cashback/dtos/redemption/redemption';

const redemptionToDto = (entity: IRedemption): RedemptionDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      redemptionId: validatedEntity.redemptionId,
    }),
    defaultOutput: {} as RedemptionDto,
  });

export default redemptionToDto;
