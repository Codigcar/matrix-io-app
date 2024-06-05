import {
  InferType, object, string, number,
} from 'yup';

export const RedemptionResponseSchema = object({
  id: string().required(),
  description: string().optional(),
  points: number().required(),
  date: string().optional(),
  lastUpdate: string().required(),
  status: string().required(),
  card: object({
    id: string().optional(),
    alias: string().optional(),
  }).optional(),
  errorReason: string().optional(),
  errorCode: string().optional(),
});

export type RedemptionResponseDto = InferType<typeof RedemptionResponseSchema>;
