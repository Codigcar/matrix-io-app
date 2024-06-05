import { InferType, object, string, array, mixed } from 'yup';

const LocalAppliesDiscountSchema = object({
  local: string().required(),
  location: string().required(),
});

const CouponSchema = object({
  imgPathInternal: string().required(),
  imgPathLogo: string().required(),
  benefit: string().required(),
  channel: array().of(string().required()).required(),
  offerTitle: string().required(),
  benefitDetail: string().required(),
  benefitUse: string().required(),
  codeIO: string(),
  period: string().required(),
  partnerName: string().required(),
  category: string().required(),
  termsConditions: string().required(),
  localAppliesDiscount: mixed().test(
    (value) =>
      typeof value === 'string' || (Array.isArray(value) && value.every((val) => LocalAppliesDiscountSchema.isValidSync(val))),
  ),
});

const CouponsDetailSchema = object({
  coupon: CouponSchema.required(),
});

export const ObtainBenefitSchema = object({
  'coupons-detail': CouponsDetailSchema.required(),
});

export type ObtainBenefitDto = InferType<typeof ObtainBenefitSchema>;
