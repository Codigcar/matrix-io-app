export interface IBenefit {
  id: string;
  imgPath: string;
  benefit: string;
  benefitValue: number;
  partnerName: string;
  offerTitle: string;
  category: string;
}

export interface ICategory {
  qty: number;
  name: string;
  list: IBenefit[];
}

export interface ICoupons {
  categoryList: ICategory[];
}

export interface IObtainBenefits {
  coupons: ICoupons;
}

export default IObtainBenefits;
