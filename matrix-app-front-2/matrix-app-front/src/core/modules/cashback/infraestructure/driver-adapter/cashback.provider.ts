import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ConstantsEnum from 'src/shared/enums/constants.enum';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import ServicesEnum from 'src/shared/enums/services.enum';
import { ObtainCashbackDto } from '../../dtos/obtain-cashback.dto';
import { ObtainCashbackRuleDto } from '../../dtos/obtain-rules.dto';

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
}

export default CashbackProvider;
