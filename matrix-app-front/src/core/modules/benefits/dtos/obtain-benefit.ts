export interface ILocalAppliesDiscount {
  local: string;
  location: string;
}

export interface ICoupon {
  imgPathInternal: string;
  imgPathLogo: string;
  benefit: string;
  channel: string[];
  offerTitle: string;
  benefitDetail: string;
  benefitUse: string;
  codeIO?: string;
  period: string;
  partnerName: string;
  category: string;
  termsConditions: string;
  localAppliesDiscount: ILocalAppliesDiscount[] | string;
}

export interface ICouponsDetail {
  coupon: ICoupon;
}

export interface IObtainBenefit {
  'coupons-detail': ICouponsDetail;
}

export default IObtainBenefit;
