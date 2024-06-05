import { InferType, object, string, array } from 'yup';

export const ObtainCashbackSchema = array().of(
  object({
    account: string().nullable(),
    pointsBalance: string().required(),
    pointsExchangeRate: string().nullable(),
    pointsAmount: string().required(),
    expiryDate: string().nullable(),
  }),
);

export type ObtainCashbackDto = InferType<typeof ObtainCashbackSchema>;
