import {
  PaymentStatusDto,
  PaymentStatusScheme,
} from '../../../../dtos/payment-status/payment-status.dto';
import { IPaymentStatus } from '../../../../dtos/payment-status/payment-status.interface';
import { dtoToPaymentStatus } from './payment-status.deserialize';

describe('dtoToPaymentStatus', () => {
  it('should return valid IPaymentStatus with valid input', () => {
    const validDto: PaymentStatusDto = {
      id: 'test',
      amount: 500,
      createAt: new Date(),
      updatedAt: new Date(),
      user: 'test',
      account: 'test',
      currency: 'test',
      method: 'test',
      pendingAmount: 500,
      error: {
        code: 'test',
      },
      chargeOperation: 'test',
      status: 'FAILED',
    };

    const result: IPaymentStatus = dtoToPaymentStatus(validDto);

    expect(PaymentStatusScheme.isValidSync(result)).toBe(true);
    expect(result.amount).toBe(validDto.amount);
  });
});
