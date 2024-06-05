import { ICreditCardDetailRepository } from '../../../repository/credit-card-detail.repository';
import { IPaymentOrderDto } from '../../../dtos';
import { dtoToPaymentOrders } from '../../mappers';
import { GetPaymentOrdersUseCase } from './get-payment-order.use-case';

jest.mock('../../../repository/credit-card-detail.repository');

describe('GetPaymentOrdersUseCase', () => {
  let getPaymentOrdersUseCase: GetPaymentOrdersUseCase;
  let mockCreditCardDetailRepository: jest.Mocked<ICreditCardDetailRepository>;

  beforeEach(() => {
    mockCreditCardDetailRepository = {
      getPaymentOrder: jest.fn(),
    } as any;
    getPaymentOrdersUseCase = new GetPaymentOrdersUseCase(mockCreditCardDetailRepository);
  });

  it('should correctly retrieve and process payment orders', async () => {
    const mockPaymentOrdersDto: IPaymentOrderDto[] = [
      // Mocked payment order data
    ];
    const expectedPaymentOrders = dtoToPaymentOrders(mockPaymentOrdersDto);

    mockCreditCardDetailRepository.getPaymentOrder.mockResolvedValueOnce(mockPaymentOrdersDto);

    const result = await getPaymentOrdersUseCase.execute();

    expect(mockCreditCardDetailRepository.getPaymentOrder).toHaveBeenCalled();
    expect(result).toEqual(expectedPaymentOrders);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    mockCreditCardDetailRepository.getPaymentOrder.mockRejectedValueOnce(
      new Error('Error retrieving payment orders'),
    );

    await expect(getPaymentOrdersUseCase.execute()).rejects.toThrow(
      'Error retrieving payment orders',
    );
  });
});
