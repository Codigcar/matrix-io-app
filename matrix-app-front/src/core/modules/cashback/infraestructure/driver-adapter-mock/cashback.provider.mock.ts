/* eslint-disable no-console */
import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import { ObtainCashbackDto } from 'src/core/modules/cashback/dtos/obtain-cashback/obtain-cashback.dto';

const ObtainCashbackResponseMock = [
  {
    account: '',
    pointsBalance: '4',
    pointsExchangeRate: '',
    pointsAmount: '925',
    expiryDate: '',
  },
  {
    account: '',
    pointsBalance: '5',
    pointsExchangeRate: '',
    pointsAmount: '925',
    expiryDate: '',
  },
];

class CashbackProviderMock implements ICashbackRepository {
  public async obtainCashback(): Promise<ObtainCashbackDto> {
    return ObtainCashbackResponseMock;
  }
}

export default CashbackProviderMock;
