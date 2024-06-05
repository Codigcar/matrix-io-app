import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { PaymentMethodFactory } from './payment-method.factory';
import { PaymentMethodProviderMock } from '../driver-adapter-mock/payment-method.provider.mock';
import { PaymentMethodProvider } from '../driver-adapter/payment-method.provider';

jest.mock('../driver-adapter/payment-method.provider');
jest.mock('../driver-adapter-mock/payment-method.provider.mock');

describe('PaymentMethodFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return PaymentMethodFactory instance for PROVIDER', () => {
    const instance = PaymentMethodFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(PaymentMethodProvider);
  });

  it('should return PaymentMethodFactoryMock instance for MOCK', () => {
    const instance = PaymentMethodFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(PaymentMethodProviderMock);
  });

  it('should return PaymentMethodFactory instance as default', () => {
    const instance = PaymentMethodFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(PaymentMethodProvider);
  });
});
