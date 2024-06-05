import { InferType, object, string } from 'yup';

export const ResendSignUpCodeRequestSchema = object({
  username: string().required(),
});

export type ResendSignUpCodeRequestDto = InferType<typeof ResendSignUpCodeRequestSchema>;
