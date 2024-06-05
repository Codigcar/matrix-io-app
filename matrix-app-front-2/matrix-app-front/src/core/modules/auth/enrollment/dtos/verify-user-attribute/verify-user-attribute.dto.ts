import { InferType, object, string } from 'yup';

export const VerifyUserAttributeRequestSchema = object({
  attribute: string().required(),
  code: string().required(),
});

export type VerifyUserAttributeRequestDto = InferType<typeof VerifyUserAttributeRequestSchema>;
