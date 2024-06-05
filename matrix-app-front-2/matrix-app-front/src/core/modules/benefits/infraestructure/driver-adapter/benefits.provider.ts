import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ConstantsEnum from 'src/shared/enums/constants.enum';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import ServicesEnum from 'src/shared/enums/services.enum';
import { ObtainBenefitsDto } from 'src/core/modules/benefits/dtos/obtain-benefits.dto';
import { ObtainBenefitDto } from 'src/core/modules/benefits/dtos/obtain-benefit.dto';

class BenefitsProvider implements IBenefitsRepository {
  public httpImpl: HttpImplementation;

  constructor() {
    this.httpImpl = new HttpImplementation();
  }

  public async obtainBenefits(): Promise<ObtainBenefitsDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.OBTAIN_BENEFITS,
      ConstantsEnum.JSON,
    );
  }

  public async obtainBenefit(id: string): Promise<ObtainBenefitDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.OBTAIN_BENEFITS + id,
      ConstantsEnum.JSON,
    );
  }
}

export default BenefitsProvider;
