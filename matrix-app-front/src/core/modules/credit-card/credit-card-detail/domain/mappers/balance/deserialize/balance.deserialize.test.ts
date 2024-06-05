import { BalanceScheme, IBalance, IBalanceDto } from '../../../../dtos';
import { dtoToBalance } from './balance.deserialize';

describe('dtoToBalance', () => {
  it('should not correctly transform IBalanceDto to IBalance', () => {
    const dto: IBalanceDto = {
      consumed: {
        amount: 100,
        currency: 'USD',
        details: [
          { amount: 50, currency: 'USD' },
          { amount: 30, currency: 'USD' },
        ],
      },
      accountId: '12345',
      available: {
        amount: 200,
        currency: 'USD',
      },
      creditLimit: {
        amount: 500,
        currency: 'USD',
      },
    };

    const result: IBalance = dtoToBalance(dto);

    expect(BalanceScheme.isValidSync(result)).toBe(false);
  });
});
