import { InferType, object, string } from 'yup';

export const ObtainCashbackRuleSchema = object({
  minRedemptionPoints: string().required(),
  maxRedemptionPoints: string().required(),
  pointsExchangeRate: string().required(),
});

export type ObtainCashbackRuleDto = InferType<typeof ObtainCashbackRuleSchema>;
