import { IPaymentMethodRepository } from '../../../repository/payment-method.repository';
import { DeletePaymentMethodUseCase } from './delete-payment-method.use-case';

jest.mock('../../../repository/payment-method.repository');

describe('DeletePaymentMethodUseCase', () => {
  let deletePaymentMethodUseCase: DeletePaymentMethodUseCase;
  let mockPaymentMethodRepository: jest.Mocked<IPaymentMethodRepository>;

  beforeEach(() => {
    mockPaymentMethodRepository = {
      deletePaymentMethod: jest.fn(),
    } as any;
    deletePaymentMethodUseCase = new DeletePaymentMethodUseCase(
      mockPaymentMethodRepository,
    );
  });

  it('should call repository deletePaymentMethod with the correct id', async () => {
    const paymentMethodId = '123';

    await deletePaymentMethodUseCase.execute(paymentMethodId);

    expect(mockPaymentMethodRepository.deletePaymentMethod).toHaveBeenCalledWith(
      paymentMethodId,
    );
  });

  it('should handle exceptions thrown by repository method', async () => {
    const paymentMethodId = '123';
    mockPaymentMethodRepository.deletePaymentMethod.mockRejectedValueOnce(
      new Error('Error deleting payment method'),
    );

    await expect(deletePaymentMethodUseCase.execute(paymentMethodId)).rejects.toThrow(
      'Error deleting payment method',
    );
  });
});
