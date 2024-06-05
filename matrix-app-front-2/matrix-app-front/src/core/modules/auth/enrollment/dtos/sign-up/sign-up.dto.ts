import { InferType, object, string } from 'yup';

export const SignUpSchema = object({
  userSub: string().required(),
  codeDeliveryDetails: object({
    DeliveryMedium: string().optional(),
  }).optional(),
});

export type SignUpDto = InferType<typeof SignUpSchema>;
