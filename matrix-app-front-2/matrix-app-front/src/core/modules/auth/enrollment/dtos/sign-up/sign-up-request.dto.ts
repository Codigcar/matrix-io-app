import { InferType, object, string } from 'yup';

export const SignUpRequestSchema = object({
  username: string().required(),
  password: string().required(),
  attributes: object({
    phone_number: string().required(),
    email: string().required(),
    'custom:referralCode': string().optional().nullable(),
    'custom:document_number': string().required(),
  }),
  clientMetadata: object({
    session: string().required(),
    device: string().required(),
  }),
});

export type SignUpRequestDto = InferType<typeof SignUpRequestSchema>;
