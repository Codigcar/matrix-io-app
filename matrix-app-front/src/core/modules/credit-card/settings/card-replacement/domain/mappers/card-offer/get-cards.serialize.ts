import { serialize } from 'src/core/helpers/transform';

import { GetCardsDto } from '../../../dtos/card-offer/get-cards.dto';
import { IGetCards } from '../../../dtos/card-offer/get-cards.interface';

export const getCardsToDto = (entity: IGetCards): GetCardsDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => validatedEntity,
    defaultOutput: [] as GetCardsDto,
  });
