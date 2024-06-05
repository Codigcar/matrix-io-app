import {
  InferType, object, string,
} from 'yup';

export const PaymentScheme = object({
  id: string().required(),
  createAt: string().required(),
  amount: string().required(),
});

export type PaymentDto = InferType<typeof PaymentScheme>;
