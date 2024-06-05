import {
  object, string, boolean, InferType,
} from 'yup';

export const AccountStatementsRequestScheme = object({
  dateId: string().required(),
  isEncrypted: boolean().required(),
});

export type AccountStatementsRequestDto = InferType<typeof AccountStatementsRequestScheme>;
