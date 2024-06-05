import { deserialize } from 'src/core/helpers/transform';
import {
  ObtainBenefitDto,
  ObtainBenefitSchema,
} from 'src/core/modules/benefits/dtos/obtain-benefit.dto';
import IObtainBenefit from 'src/core/modules/benefits/dtos/obtain-benefit';

const dtoToObtainBenefit = (dto: ObtainBenefitDto): IObtainBenefit =>
  deserialize(dto, {
    outputSchema: ObtainBenefitSchema,
    serializationLogic: (validatedDto) => ({
      'coupons-detail': {
        coupon: {
          imgPathInternal: validatedDto['coupons-detail'].coupon.imgPathInternal,
          imgPathLogo: validatedDto['coupons-detail'].coupon.imgPathLogo,
          benefit: validatedDto['coupons-detail'].coupon.benefit,
          channel: validatedDto['coupons-detail'].coupon.channel,
          offerTitle: validatedDto['coupons-detail'].coupon.offerTitle,
          benefitDetail: validatedDto['coupons-detail'].coupon.benefitDetail,
          benefitUse: validatedDto['coupons-detail'].coupon.benefitUse,
          codeIO: validatedDto['coupons-detail'].coupon.codeIO,
          period: validatedDto['coupons-detail'].coupon.period,
          partnerName: validatedDto['coupons-detail'].coupon.partnerName,
          category: validatedDto['coupons-detail'].coupon.category,
          termsConditions: validatedDto['coupons-detail'].coupon.termsConditions,
          localAppliesDiscount: Array.isArray(
            validatedDto['coupons-detail'].coupon.localAppliesDiscount,
          )
            ? validatedDto['coupons-detail'].coupon.localAppliesDiscount.map((local) => ({
              local: local.local,
              location: local.location,
            }))
            : validatedDto['coupons-detail'].coupon.localAppliesDiscount,
        },
      },
    }),
    defaultOutput: {} as IObtainBenefit,
  });

export default dtoToObtainBenefit;
