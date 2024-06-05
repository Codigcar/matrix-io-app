import {
  InferType, object, string, array,
} from 'yup';

export const PaymentMethodScheme = object({
  id: string().required(),
  alias: string().required(),
  brand: string().required(),
  provider: string().required(),
  type: string().required(),
});

export const PaymentMethodsScheme = array().of(PaymentMethodScheme);

export type PaymentMethodDto = InferType<typeof PaymentMethodScheme>;
export type PaymentMethodsDto = InferType<typeof PaymentMethodsScheme>;
