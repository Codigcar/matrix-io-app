import { IPaymentStatus } from '../../../dtos';
import { IPaymentRepository } from '../../../repository/payment.repository';
import { dtoToPaymentStatus } from '../../mappers';
import { PaymentStatusUseCase } from './payment-status.use-case';

jest.mock('../../../repository/payment.repository');

describe('PaymentStatusUseCase', () => {
  let paymentStatusUseCase: PaymentStatusUseCase;
  let mockPaymentRepository: jest.Mocked<IPaymentRepository>;

  beforeEach(() => {
    mockPaymentRepository = {
      getPaymentStatus: jest.fn(),
    } as any;
    paymentStatusUseCase = new PaymentStatusUseCase(mockPaymentRepository);
  });

  it('should call repository getPaymentStatus with the correct id and return the transformed status', async () => {
    const paymentId = 'test-id';
    const mockDtoResponse = {
      account: 'tests',
      amount: 500,
      chargeOperation: 'tests',
      createAt: new Date(),
      currency: 'tests',
      id: 'tests',
      method: 'tests',
      pendingAmount: 500,
      status: 'FAILED',
      updatedAt: new Date(),
      user: 'tests',
      error: {
        code: 'tests',
      },
      token: 'tests',
    };
    const expectedStatus: IPaymentStatus = dtoToPaymentStatus(mockDtoResponse);

    mockPaymentRepository.getPaymentStatus.mockResolvedValueOnce(mockDtoResponse);

    const result = await paymentStatusUseCase.execute(paymentId);

    expect(mockPaymentRepository.getPaymentStatus).toHaveBeenCalledWith(paymentId);
    expect(result).toEqual(expectedStatus);
  });

  it('should handle exceptions thrown by repository method', async () => {
    const paymentId = 'test-id';
    mockPaymentRepository.getPaymentStatus.mockRejectedValueOnce(
      new Error('Error fetching payment status'),
    );

    await expect(paymentStatusUseCase.execute(paymentId)).rejects.toThrow(
      'Error fetching payment status',
    );
  });
});
