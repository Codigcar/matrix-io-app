import { deserialize } from 'src/core/helpers/transform';
import {
  ObtainCashbackDto,
  ObtainCashbackSchema,
} from 'src/core/modules/cashback/dtos/obtain-cashback.dto';
import IObtainCashback from 'src/core/modules/cashback/dtos/obtain-cashback';

const dtoToObtainCashback = (dto: ObtainCashbackDto): IObtainCashback =>
  deserialize(dto, {
    outputSchema: ObtainCashbackSchema,
    serializationLogic: (validatedDto) => {
      if (validatedDto) {
        return validatedDto.map((value: any) => ({
          account: value?.account || '',
          pointsBalance: value?.pointsBalance || '',
          pointsExchangeRate: value?.pointsExchangeRate || '',
          pointsAmount: value?.pointsAmount || '',
          expiryDate: value?.expiryDate || '',
        }));
      }
      return [];
    },
    defaultOutput: [],
  });

export default dtoToObtainCashback;
