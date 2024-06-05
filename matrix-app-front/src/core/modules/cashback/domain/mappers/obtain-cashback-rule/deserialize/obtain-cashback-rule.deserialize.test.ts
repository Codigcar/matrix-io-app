import { ObtainCashbackRuleDto } from 'src/core/modules/cashback/dtos/obtain-cashback-rule/obtain-rules.dto';
import dtoToObtainCashbackRule from './obtain-cashback-rule.deserialize';

describe('dtoToObtainCashbackRule', () => {
  it('correctly transforms a valid DTO', () => {
    const dto: ObtainCashbackRuleDto = {
      minRedemptionPoints: '100',
      maxRedemptionPoints: '500',
      pointsExchangeRate: '0.1',
    };

    const result = dtoToObtainCashbackRule(dto);

    expect(result).toEqual({
      minRedemptionPoints: '100',
      maxRedemptionPoints: '500',
      pointsExchangeRate: '0.1',
    });
  });

  it('returns default output for invalid DTO', () => {
    const dto = {};
    const result = dtoToObtainCashbackRule(dto);

    expect(result).toEqual({});
  });
});
