import { InferType, object, string } from 'yup';

export const PaymentMethodRequestScheme = object({
  token: string().required(),
});

export type PaymentMethodRequestDto = InferType<typeof PaymentMethodRequestScheme>;
