import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ConstantsEnum from 'src/shared/enums/constants.enum';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import ServicesEnum from 'src/shared/enums/services.enum';
import { ObtainCashbackRuleDto } from '../../dtos/obtain-cashback-rule/obtain-rules.dto';
import { ObtainCashbackDto } from '../../dtos/obtain-cashback/obtain-cashback.dto';
import { RedemptionRequestDto } from '../../dtos/redemption/redemption-request.dto';
import { RedemptionDto } from '../../dtos/redemption/redemption.dto';
import { RedemptionResponseDto } from '../../dtos/redemption/redemption-response.dto';

class CashbackProvider implements ICashbackRepository {
  public httpImpl: HttpImplementation;

  constructor() {
    this.httpImpl = new HttpImplementation();
  }

  public async obtainCashback(): Promise<ObtainCashbackDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.OBTAIN_CASHBACK,
      ConstantsEnum.JSON,

    );
  }

  public async obtainCashbackRule(): Promise<ObtainCashbackRuleDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.OBTAIN_CASHBACK_RULE,
      ConstantsEnum.JSON,
    );
  }

  redemption(request: RedemptionRequestDto): Promise<RedemptionDto> {
    return this.httpImpl.post(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.REDEMPTION_PROCESSING,
      request,
      ConstantsEnum.JSON,
    );
  }

  redemptionStatus(id: RedemptionDto): Promise<RedemptionResponseDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.REDEMPTION_STATUS + id,
      ConstantsEnum.JSON,
    );
  }
}

export default CashbackProvider;
