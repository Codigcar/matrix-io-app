import { InferType, object, string } from 'yup';

export const RedemptionSchema = object({
  redemptionId: string().required(),
});

export type RedemptionDto = InferType<typeof RedemptionSchema>;
