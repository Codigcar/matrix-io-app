import { IPaymentOrderDto } from '../../../../dtos';
import { dtoToPaymentOrders } from './payment-order.deserialize';

describe('dtoToPaymentOrders', () => {
  it('should correctly transform an array of IPaymentOrderDto to an array of IPaymentOrder', () => {
    const mockPaymentOrdersDto: IPaymentOrderDto[] = [
      {
        accountId: '123456',
        total: {
          amount: 1000,
          currency: 'PEN',
        },
        endDate: '2024-12-31',
        dueDate: '2024-11-30',
        pending: {
          amount: 500,
          currency: 'PEN',
        },
        statementDate: '2024-10-01',
        id: 'order-123',
        type: 'regular',
        minimum: {
          amount: 200,
          currency: 'PEN',
        },
        hasPaymentInProgress: false,
        startDate: '2024-01-01',
        status: 'active',
      },
    ];

    const results = dtoToPaymentOrders(mockPaymentOrdersDto);

    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(mockPaymentOrdersDto.length);
    results.forEach((result, index) => {
      const mockDto = mockPaymentOrdersDto[index];
      expect(result.accountId).toBe(mockDto.accountId);
    });
  });
});
