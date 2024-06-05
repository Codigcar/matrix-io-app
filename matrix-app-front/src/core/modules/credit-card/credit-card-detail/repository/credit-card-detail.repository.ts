import { BalancesDto, IPaymentOrdersDto } from '../dtos';

export interface ICreditCardDetailRepository {
  getBalance(): Promise<BalancesDto>;
  getPaymentOrder(): Promise<IPaymentOrdersDto>;
}
