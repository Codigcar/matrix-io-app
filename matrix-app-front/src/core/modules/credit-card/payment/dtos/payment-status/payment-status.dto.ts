import {
  InferType, object, string, number, date,
} from 'yup';

export const PaymentStatusScheme = object({
  amount: number().optional(),
  pendingAmount: number().optional(),
  status: string().optional(),
  updatedAt: date().optional(),
  createAt: date().optional(),
  user: string().optional(),
  id: string().optional(),
  account: string().optional(),
  chargeOperation: string().optional(),
  currency: string().optional(),
  method: string().optional(),
  error: object({
    code: string().nullable(),
  }).nullable(),
});

export type PaymentStatusDto = InferType<typeof PaymentStatusScheme>;
