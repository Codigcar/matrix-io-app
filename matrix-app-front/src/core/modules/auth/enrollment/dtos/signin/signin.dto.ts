import { InferType, object, string } from 'yup';

export const SignInSchema = object({
  signInUserSession: object({
    accessToken: object({
      jwtToken: string().required(),
    }),
  }),
});

export type SignInDto = InferType<typeof SignInSchema>;
