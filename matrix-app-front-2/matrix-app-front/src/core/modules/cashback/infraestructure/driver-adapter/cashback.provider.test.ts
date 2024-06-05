import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import CashbackProvider from './cashback.provider';

// Mock para HttpImplementation
jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('CashbackProvider', () => {
  let cashbackProvider: CashbackProvider;
  let mockHttp: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    cashbackProvider = new CashbackProvider();
    mockHttp = new HttpImplementation() as jest.Mocked<HttpImplementation>;
    cashbackProvider.httpImpl = mockHttp;
  });

  test('should return a response when successful obtainCashback', async () => {
    const mockResponse = {
      data: [
        {
          account: 'accountValue',
          pointsBalance: '100',
          pointsExchangeRate: '0.5',
          pointsAmount: '50',
          expiryDate: '2023-12-31',
        },
      ],
      status: 200,
    };

    mockHttp.get.mockResolvedValue(mockResponse);

    const response = await cashbackProvider.obtainCashback();
    expect(response).toEqual(mockResponse);
  });

  test('should return a response when successful obtainCashbackRule', async () => {
    const mockResponse = {
      data: {
        minRedemptionPoints: 100,
        maxRedemptionPoints: 500,
        pointsExchangeRate: 0.1,
      },
      status: 200,
    };

    mockHttp.get.mockResolvedValue(mockResponse);

    const response = await cashbackProvider.obtainCashbackRule();
    expect(response).toEqual(mockResponse);
  });
});
