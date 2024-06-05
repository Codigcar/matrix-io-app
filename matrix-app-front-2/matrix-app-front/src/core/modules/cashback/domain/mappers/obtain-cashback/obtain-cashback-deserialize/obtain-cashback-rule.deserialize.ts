import { deserialize } from 'src/core/helpers/transform';
import { ObtainCashbackRuleDto, ObtainCashbackRuleSchema } from 'src/core/modules/cashback/dtos/obtain-rules.dto';
import IObtainCashbackRule from 'src/core/modules/cashback/dtos/obtain-rules';

const dtoToObtainCashbackRule = (dto: ObtainCashbackRuleDto): IObtainCashbackRule =>
  deserialize(dto, {
    outputSchema: ObtainCashbackRuleSchema,
    serializationLogic: (validatedDto) => ({
      minRedemptionPoints: validatedDto.minRedemptionPoints,
      maxRedemptionPoints: validatedDto.maxRedemptionPoints,
      pointsExchangeRate: validatedDto.pointsExchangeRate,

    }),
    defaultOutput: {} as ObtainCashbackRuleDto,
  });

export default dtoToObtainCashbackRule;
