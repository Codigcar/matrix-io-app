import { InferType, object, string } from 'yup';

export const GetReferralCodeSchema = object({
  code: string().required(),
});

export type GetReferralCodeDto = InferType<typeof GetReferralCodeSchema>;
