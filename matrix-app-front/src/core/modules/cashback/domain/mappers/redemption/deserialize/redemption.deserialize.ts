import { deserialize } from 'src/core/helpers/transform';
import {
  RedemptionDto,
  RedemptionSchema,
} from 'src/core/modules/cashback/dtos/redemption/redemption.dto';
import { IRedemption } from 'src/core/modules/cashback/dtos/redemption/redemption';

const dtoRedemptionId = (dto: RedemptionDto): IRedemption =>
  deserialize(dto, {
    outputSchema: RedemptionSchema,
    serializationLogic: (validatedDto) => ({
      redemptionId: validatedDto.redemptionId,
    }),
    defaultOutput: {} as RedemptionDto,
  });

export default dtoRedemptionId;
