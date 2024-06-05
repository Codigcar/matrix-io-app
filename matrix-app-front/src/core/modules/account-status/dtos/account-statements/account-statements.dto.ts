import { object, string, InferType } from 'yup';

export const AccountStatementsScheme = object({
  id: string().required(),
  url: string().required(),
});

export type AccountStatementsDto = InferType<typeof AccountStatementsScheme>;
