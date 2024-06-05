import { InferType, object, string } from 'yup';

export const OnboardingDataScheme = object({
  user: object({
    name: string().required(),
    lastName: string().required(),
    documentNumber: string().required(),
    location: object({
      address: string().required(),
      district: string().required(),
      province: string().required(),
      state: string().required(),
    }).required(),
  }).required(),
  account: object({
    id: string().required(),
  }).required(),
  status: string().required(),
});

export type OnboardingDataDto = InferType<typeof OnboardingDataScheme>;
