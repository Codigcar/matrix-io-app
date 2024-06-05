import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { PaymentFactory } from './payment.factory';
import { PaymentProvider } from '../driver-adapter/payment.provider';
import { PaymentProviderMock } from '../driver-adapter-mock/payment.provider.mock';

jest.mock('../driver-adapter/payment.provider');
jest.mock('../driver-adapter-mock/payment.provider.mock');

describe('PaymentFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return PaymentProvider instance for PROVIDER', () => {
    const instance = PaymentFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(PaymentProvider);
  });

  it('should return PaymentProviderMock instance for MOCK', () => {
    const instance = PaymentFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(PaymentProviderMock);
  });

  it('should return PaymentProvider instance as default', () => {
    const instance = PaymentFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(PaymentProvider);
  });
});
