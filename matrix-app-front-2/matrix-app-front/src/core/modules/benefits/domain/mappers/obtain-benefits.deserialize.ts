import { deserialize } from 'src/core/helpers/transform';
import {
  ObtainBenefitsDto,
  ObtainBenefitsSchema,
} from 'src/core/modules/benefits/dtos/obtain-benefits.dto';
import IObtainBenefits from 'src/core/modules/benefits/dtos/obtain-benefits';

const dtoToObtainBenefits = (dto: ObtainBenefitsDto): IObtainBenefits =>
  deserialize(dto, {
    outputSchema: ObtainBenefitsSchema,
    serializationLogic: (validatedDto) => ({
      coupons: {
        categoryList: validatedDto.coupons.categoryList.map((category) => ({
          qty: category.qty,
          name: category.name,
          list: category.list.map((benefit) => ({
            id: benefit.id,
            imgPath: benefit.imgPath,
            benefit: benefit.benefit,
            benefitValue: benefit.benefitValue,
            partnerName: benefit.partnerName,
            offerTitle: benefit.offerTitle,
            category: benefit.category,
          })),
        })),
      },
    }),
    defaultOutput: {} as IObtainBenefits,
  });

export default dtoToObtainBenefits;
