/* eslint-disable no-console */
import { PaymentDto, PaymentRequestDto, PaymentStatusDto } from '../../dtos';
import { IPaymentRepository } from '../../repository/payment.repository';

export class PaymentProviderMock implements IPaymentRepository {
  async creditCardPayment(data: PaymentRequestDto): Promise<PaymentDto> {
    console.log('creditCardPayment called with: ', data);
    return Promise.resolve({
      id: 'test',
      createAt: 'test',
      amount: 'test',
    });
  }

  async getPaymentStatus(id: string): Promise<PaymentStatusDto> {
    console.log(`getPaymentStatus called with id: ${id}`);
    return Promise.resolve({
      id: 'some-unique-id',
      account: 'user-account-id',
      chargeOperation: 'charge-operation-type',
      amount: 100.0,
      currency: 'USD',
      method: 'credit-card',
      pendingAmount: 50.0,
      status: 'COMPLETED',
      updatedAt: new Date(),
      createAt: new Date(),
      user: 'user-id',
      error: {
        code: null,
      },
    });
  }
}
