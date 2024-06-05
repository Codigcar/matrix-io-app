import { InferType, object, string } from 'yup';

export const RedemptionRequestSchema = object({
  account: string().required(),
  points: string().required(),

});

export type RedemptionRequestDto = InferType<typeof RedemptionRequestSchema>;
