import { InferType, object, string } from 'yup';

export const RecoverPasswordSchema = object({
  CodeDeliveryDetails: object({
    AttributeName: string().optional(),
    DeliveryMedium: string().optional(),
  }).required(),
});

export type RecoverPasswordDto = InferType<typeof RecoverPasswordSchema>;
