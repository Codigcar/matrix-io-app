import { InferType, object, string, number, array } from 'yup';

const BenefitSchema = object({
  id: string().required(),
  imgPath: string().required(),
  benefit: string().required(),
  benefitValue: number().required(),
  partnerName: string().required(),
  offerTitle: string().required(),
  category: string().required(),
});

const CategorySchema = object({
  qty: number().required(),
  name: string().required(),
  list: array().of(BenefitSchema).required(),
});

const CouponsSchema = object({
  categoryList: array().of(CategorySchema).required(),
});

export const ObtainBenefitsSchema = object({
  coupons: CouponsSchema.required(),
});

export type ObtainBenefitsDto = InferType<typeof ObtainBenefitsSchema>;
