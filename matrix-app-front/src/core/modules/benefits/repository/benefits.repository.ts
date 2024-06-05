import { ObtainBenefitsDto } from 'src/core/modules/benefits/dtos/obtain-benefits.dto';
import { ObtainBenefitDto } from 'src/core/modules/benefits/dtos/obtain-benefit.dto';

export interface IBenefitsRepository {
  obtainBenefits(): Promise<ObtainBenefitsDto>;
  obtainBenefit(id: string): Promise<ObtainBenefitDto>;
}
