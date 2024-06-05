/* eslint-disable no-console */
import { PaymentMethodRequestDto } from '../../dtos/payment-method/payment-method-request.dto';
import { PaymentMethodDto, PaymentMethodsDto } from '../../dtos/payment-method/payment-method.dto';
import { IPaymentMethodRepository } from '../../repository/payment-method.repository';

export class PaymentMethodProviderMock implements IPaymentMethodRepository {
  async setPaymentMethod(data: PaymentMethodRequestDto): Promise<PaymentMethodDto> {
    console.log('setPaymentMethod called with: ', data);
    return Promise.resolve({
      id: 'mocked_id',
      type: data.token,
      provider: 'mocked_provider',
      alias: 'mocked_alias',
      brand: 'mocked_brand',
      details: { cardNumber: 'xxxx-xxxx-xxxx-1234' },
    });
  }

  async getPaymentMethod(): Promise<PaymentMethodsDto> {
    console.log('getPaymentMethod called');
    return Promise.resolve([
      {
        id: 'test',
        alias: 'test',
        brand: 'test',
        provider: 'test',
        type: 'test',
      },
      {
        id: 'test',
        alias: 'test',
        brand: 'test',
        provider: 'test',
        type: 'test',
      },
    ]);
  }

  async deletePaymentMethod(id: string): Promise<void> {
    console.log(`deletePaymentMethod called with id: ${id}`);
    return Promise.resolve();
  }
}
