import {
  PaymentRequestDto,
  PaymentRequestScheme,
} from '../../../../dtos/payment/payment-request.dto';
import { IPaymentRequest } from '../../../../dtos/payment/payment-request.interface';
import { paymentRequestToDto } from './payment.serialize';

describe('PpaymentRequestToDto', () => {
  it('should return valid IPaymentRequest with valid input', () => {
    const request: IPaymentRequest = {
      card: {},
      method: 'test',
      amount: 500,
      currency: 'test',
      account: 'test',
    };

    const result: PaymentRequestDto = paymentRequestToDto(request);

    expect(PaymentRequestScheme.isValidSync(result)).toBe(true);
    expect(result.method).toBe(request.method);
  });
});
