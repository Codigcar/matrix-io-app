import { InferType, object, string } from 'yup';

export const RecoverPasswordRequestSchema = object({
  username: string().required(),
  clientMetadata: object({
    session: string().required(),
  }).optional(),
});

export type RecoverPasswordRequestDto = InferType<typeof RecoverPasswordRequestSchema>;
