import { deserialize } from 'src/core/helpers/transform';
import { IRedemptionResponse } from 'src/core/modules/cashback/dtos/redemption/redemption-response';
import {
  RedemptionResponseDto,
  RedemptionResponseSchema,
} from 'src/core/modules/cashback/dtos/redemption/redemption-response.dto';

const dtoRedemptionStatus = (dto: RedemptionResponseDto): IRedemptionResponse =>
  deserialize(dto, {
    outputSchema: RedemptionResponseSchema,
    serializationLogic: (validatedDto) => ({
      id: validatedDto.id,
      description: validatedDto.description,
      points: validatedDto.points,
      lastUpdate: validatedDto.lastUpdate,
      status: validatedDto.status as 'REQUESTED' | 'COMPLETED' | 'FAILED',
      card: {
        id: validatedDto.card.id || '',
        alias: validatedDto.card.alias || '',
      },
      errorReason: validatedDto.errorReason,
      errorCode: validatedDto.errorCode as 'INVALID_POINTS' | 'INVALID_CARD_ACCOUNT' | 'PROVIDER_ERROR' | 'INVALID_CARD_STATUS',
    }),
    defaultOutput: {} as IRedemptionResponse,
  });

export default dtoRedemptionStatus;
