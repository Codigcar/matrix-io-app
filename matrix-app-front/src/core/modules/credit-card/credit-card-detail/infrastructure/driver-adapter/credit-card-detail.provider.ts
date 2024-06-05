import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/core/enums/services-instance.enum';
import ConstantsEnum from 'src/core/enums/constants.enum';
import AccountStatusApiEnum from 'src/core/enums/services/account-status-api.enum';
import { ICreditCardDetailRepository } from '../../repository/credit-card-detail.repository';
import { BalancesDto, IPaymentOrdersDto } from '../../dtos';

export class CreditCardDetailProvider implements ICreditCardDetailRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  async getBalance(): Promise<BalancesDto> {
    return this.httpImpl.get(
      ServicesInstanceEnum.API_INSTANCE,
      AccountStatusApiEnum.BALANCE,
      ConstantsEnum.JSON,
    );
  }

  async getPaymentOrder(): Promise<IPaymentOrdersDto> {
    return this.httpImpl.get<IPaymentOrdersDto>(
      ServicesInstanceEnum.API_INSTANCE,
      AccountStatusApiEnum.PAYMENT_ORDERS,
      ConstantsEnum.JSON,
    );
  }
}
