import { serialize } from 'src/core/helpers/transform';
import { ReplacementCardReissuesRequestDto } from '../../../dtos/card-offer/replacement-card-reissues.dto';
import { IReplacementCardReissuesRequest } from '../../../dtos/card-offer/replacement-card-reissues.interface';

export const replacementCardReissuesToDto = (
  entity: IReplacementCardReissuesRequest,
): ReplacementCardReissuesRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      cardId: validatedEntity.cardId,
    }),
    defaultOutput: {} as ReplacementCardReissuesRequestDto,
  });
