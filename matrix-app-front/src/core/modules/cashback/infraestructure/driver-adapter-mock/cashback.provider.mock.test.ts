import { ObtainCashbackDto } from 'src/core/modules/cashback/dtos/obtain-cashback/obtain-cashback.dto';
import CashbackProviderMock from './cashback.provider.mock';

describe('CashbackProviderMock', () => {
  let provider: CashbackProviderMock;

  beforeEach(() => {
    provider = new CashbackProviderMock();
  });

  it('returns the mocked cashback data', async () => {
    const expectedResponse: ObtainCashbackDto = [
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

    const result = await provider.obtainCashback();
    expect(result).toEqual(expectedResponse);
  });
});
