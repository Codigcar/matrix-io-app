import { InferType, object, string } from 'yup';

export const RecaptchaSessionRequestSchema = object({
  recaptchaToken: string().required(),
  version: string().required(),
  authFlow: string().required(),
});

export type RecaptchaSessionRequestDto = InferType<typeof RecaptchaSessionRequestSchema>;
