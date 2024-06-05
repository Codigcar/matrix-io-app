import { CreditCardDetailProvider } from '../../../infrastructure';
import { IBalance, BalancesDto } from '../../../dtos';
import { dtoToBalances } from '../../mappers';
import { GetBalanceUseCase } from './get-balance.use-case';

jest.mock('../../../infrastructure');

describe('GetBalanceUseCase', () => {
  let getBalanceUseCase: GetBalanceUseCase;
  let mockCreditCardDetailProvider: jest.Mocked<CreditCardDetailProvider>;

  beforeEach(() => {
    mockCreditCardDetailProvider = {
      getBalance: jest.fn(),
    } as any;
    getBalanceUseCase = new GetBalanceUseCase(mockCreditCardDetailProvider);
  });

  it('should correctly retrieve and process balance data', async () => {
    const mockBalanceDto: BalancesDto = [
      {
        consumed: {
          amount: Math.floor(Math.random() * 1000),
          currency: 'USD',
          details: [
            {
              amount: Math.floor(Math.random() * 500),
              currency: 'USD',
            },
          ],
        },
        accountId: 'someAccountId',
        available: {
          amount: Math.floor(Math.random() * 1000),
          currency: 'USD',
        },
        creditLimit: {
          amount: Math.floor(Math.random() * 2000),
          currency: 'USD',
        },
        isDelinquent: false,
      },
    ];

    const expectedBalance: IBalance = dtoToBalances(mockBalanceDto)[0];

    mockCreditCardDetailProvider.getBalance.mockResolvedValueOnce(mockBalanceDto);

    const result = await getBalanceUseCase.execute();

    expect(mockCreditCardDetailProvider.getBalance).toHaveBeenCalled();
    expect(result).toEqual(expectedBalance);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    mockCreditCardDetailProvider.getBalance.mockRejectedValueOnce(
      new Error('Error retrieving balance'),
    );

    await expect(getBalanceUseCase.execute()).rejects.toThrow('Error retrieving balance');
  });
});
