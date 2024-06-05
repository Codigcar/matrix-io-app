import { IPaymentMethod, PaymentMethodDto, PaymentMethodScheme } from '../../../../dtos';
import { dtoToPaymentMethod } from './payment-method.deserialize';

describe('dtoToPaymentMethod', () => {
  it('should return valid IRecoverPassword with valid input', () => {
    const validDto: PaymentMethodDto = {
      alias: 'alias',
      brand: 'brand',
      id: 'id',
      provider: 'provider',
      type: 'type',
    };

    const result: IPaymentMethod = dtoToPaymentMethod(validDto);

    expect(PaymentMethodScheme.isValidSync(result)).toBe(true);
    expect(result.alias).toBe(validDto.alias);
    expect(result.brand).toBe(validDto.brand);
    expect(result.id).toBe(validDto.id);
    expect(result.provider).toBe(validDto.provider);
    expect(result.type).toBe(validDto.type);
  });
});
