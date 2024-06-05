import { InferType, object, string } from 'yup';

export const SendVerifyCodeAttributeRequestSchema = object({
  attribute: string().required(),
});

export type SendVerifyCodeAttributeRequestDto = InferType<
  typeof SendVerifyCodeAttributeRequestSchema
>;
