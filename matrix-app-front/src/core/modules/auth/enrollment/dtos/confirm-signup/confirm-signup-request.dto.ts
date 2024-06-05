import { InferType, object, string } from 'yup';

export const ConfirmSignUpRequestSchema = object({
  username: string().required(),
  code: string().required(),
});

export type ConfirmSignUpRequestDto = InferType<typeof ConfirmSignUpRequestSchema>;
