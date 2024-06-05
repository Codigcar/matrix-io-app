import { InferType, object, string } from 'yup';

export const RecaptchaSessionSchema = object({
  id: string().required(),
  token: string().required(),
});

export type RecaptchaSessionDto = InferType<typeof RecaptchaSessionSchema>;
