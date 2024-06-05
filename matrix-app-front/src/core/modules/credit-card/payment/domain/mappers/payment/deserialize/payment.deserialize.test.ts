import { PaymentDto, PaymentScheme } from '../../../../dtos/payment/payment.dto';
import { IPayment } from '../../../../dtos/payment/payment.interface';
import { dtoToPayment } from './payment.deserialize';

describe('dtoToPayment', () => {
  it('should return valid IPayment with valid input', () => {
    const validDto: PaymentDto = {
      id: 'test',
      amount: '500',
      createAt: '2021-01-01T00:00:00.000Z',
    };

    const result: IPayment = dtoToPayment(validDto);

    expect(PaymentScheme.isValidSync(result)).toBe(true);
    expect(result.amount).toBe(validDto.amount);
  });
});
