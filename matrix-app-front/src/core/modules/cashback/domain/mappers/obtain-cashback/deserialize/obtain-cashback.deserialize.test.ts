import { ObtainCashbackDto, ObtainCashbackSchema } from 'src/core/modules/cashback/dtos/obtain-cashback/obtain-cashback.dto';
import dtoToObtainCashback from './obtain-cashback.deserialize';

// Mock para deserialize
jest.mock('src/core/helpers/transform');

describe('dtoToObtainCashback', () => {
  test('should return an array of IObtainCashback ', () => {
    const mockDto: ObtainCashbackDto = [
      {
        account: 'accountValue',
        pointsBalance: '100',
        pointsExchangeRate: '0.5',
        pointsAmount: '50',
        expiryDate: '2023-12-31',
      },
    ];

    const result = dtoToObtainCashback(mockDto);
    expect(ObtainCashbackSchema.isValidSync(result)).toBe(true);
  });
});
