import {
  object, array, string, number, InferType, bool,
} from 'yup';

const MinimumScheme = object({
  amount: number().required(),
  currency: string().optional(),
});

export const PaymentOrderScheme = object({
  accountId: string().required(),
  total: MinimumScheme,
  endDate: string().required(),
  dueDate: string().required(),
  pending: MinimumScheme,
  statementDate: string().required(),
  id: string().required(),
  type: string().required(),
  minimum: MinimumScheme,
  hasPaymentInProgress: bool().required(),
  startDate: string().required(),
  status: string().required(),
});

export const PaymentOrdersScheme = array().of(PaymentOrderScheme);

export type IPaymentOrderDto = InferType<typeof PaymentOrderScheme>;
export type IPaymentOrdersDto = InferType<typeof PaymentOrdersScheme>;
