import {
  IPaymentMethodRequest,
  PaymentMethodRequestDto,
  PaymentMethodRequestScheme,
} from '../../../../dtos';
import { paymentMethodRequestToDto } from './payment-method.serialize';

describe('paymentMethodRequestToDto', () => {
  it('should return valid IPaymentMethodRequest with valid input', () => {
    const validAuthUserSet: IPaymentMethodRequest = {
      token: 'username',
    };

    const result: PaymentMethodRequestDto = paymentMethodRequestToDto(validAuthUserSet);

    expect(PaymentMethodRequestScheme.isValidSync(result)).toBe(true);
    expect(result.token).toBe(validAuthUserSet.token);
  });
});
