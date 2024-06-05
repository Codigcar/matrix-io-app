import { InferType, object, string } from 'yup';

export const ConfirmPasswordRequestSchema = object({
  username: string().required(),
  password: string().required(),
  code: string().required(),
  clientMetadata: object({
    session: string().required(),
    device: string().required(),
  }).optional(),
});

export type ConfirmPasswordRequestDto = InferType<typeof ConfirmPasswordRequestSchema>;
