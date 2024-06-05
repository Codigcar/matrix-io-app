import { InferType, object, string } from 'yup';

export const SignInRequestSchema = object({
  username: string().required(),
  password: string().required(),
  metadata: object({
    session: string().required(),
    device: string().required(),
  }),
});

export type SignInRequestDto = InferType<typeof SignInRequestSchema>;
