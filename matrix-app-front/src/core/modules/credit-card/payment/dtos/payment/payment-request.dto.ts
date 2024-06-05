import {
  InferType, object, string, number,
} from 'yup';

export const PaymentRequestScheme = object({
  method: string().required(),
  amount: number().required(),
  currency: string().required(),
  account: string().required(),
});

export type PaymentRequestDto = InferType<typeof PaymentRequestScheme>;
