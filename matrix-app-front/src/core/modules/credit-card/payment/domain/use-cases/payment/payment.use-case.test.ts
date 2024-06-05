import { IPaymentRepository } from '../../../repository/payment.repository';
import { IPayment, IPaymentRequest } from '../../../dtos';
import { dtoToPayment, paymentRequestToDto } from '../../mappers';
import { PaymentUseCase } from './payment.use-case';

jest.mock('../../../repository/payment.repository');

describe('PaymentUseCase', () => {
  let paymentUseCase: PaymentUseCase;
  let mockPaymentRepository: jest.Mocked<IPaymentRepository>;

  beforeEach(() => {
    mockPaymentRepository = {
      creditCardPayment: jest.fn(),
    } as any;
    paymentUseCase = new PaymentUseCase(mockPaymentRepository);
  });

  it('should correctly process the payment request', async () => {
    const paymentRequest: IPaymentRequest = {
      method: 'method',
      amount: 100,
      currency: 'USD',
      account: 'account-id',
    };
    const mockRequestDto = paymentRequestToDto(paymentRequest);
    const mockResponseDto = {
      id: 'payment-id',
      amount: '100',
      createAt: '2023-01-01',
    };
    const expectedPayment: IPayment = dtoToPayment(mockResponseDto);

    mockPaymentRepository.creditCardPayment.mockResolvedValueOnce(mockResponseDto);

    const result = await paymentUseCase.execute(paymentRequest);

    expect(mockPaymentRepository.creditCardPayment).toHaveBeenCalledWith(mockRequestDto);
    expect(result).toEqual(expectedPayment);
  });

  it('should handle exceptions thrown by repository method', async () => {
    const paymentRequest: IPaymentRequest = {
      method: 'method',
      amount: 100,
      currency: 'USD',
      account: 'account-id',
    };
    mockPaymentRepository.creditCardPayment.mockRejectedValueOnce(
      new Error('Error processing payment'),
    );

    await expect(paymentUseCase.execute(paymentRequest)).rejects.toThrow(
      'Error processing payment',
    );
  });
});
