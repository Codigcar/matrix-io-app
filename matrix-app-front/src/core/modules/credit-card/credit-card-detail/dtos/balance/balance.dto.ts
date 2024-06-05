import {
  object, string, boolean, number, InferType, array,
} from 'yup';

export const BalanceScheme = object({
  consumed: object({
    amount: number().required(),
    currency: string().required(),
    details: array().of(
      object({
        amount: number().required(),
        currency: string().required(),
      }),
    ),
  }),
  accountId: string().optional(),
  available: object({
    amount: number().required(),
    currency: string().required(),
  }),
  creditLimit: object({
    amount: number().required(),
    currency: string().required(),
  }),
  isDelinquent: boolean().optional(),
});

export const BalancesScheme = array().of(BalanceScheme);
export type BalanceDto = InferType<typeof BalanceScheme>;
export type BalancesDto = InferType<typeof BalancesScheme>;
