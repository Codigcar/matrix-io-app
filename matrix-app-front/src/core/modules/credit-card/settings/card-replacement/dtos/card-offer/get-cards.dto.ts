import { array, boolean, InferType, object, string } from 'yup';

export const CardScheme = object({
  account: string().required(),
  id: string().required(),
  isMain: boolean().required(),
  reference: string().required(),
  status: string().required(),
});

export const GetCardsSchema = array().of(CardScheme).required();

export type GetCardsDto = InferType<typeof GetCardsSchema>;
