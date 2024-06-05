import CashbackProvider from 'src/core/modules/cashback/infraestructure/driver-adapter/cashback.provider';
import CashbackProviderMock from 'src/core/modules/cashback/infraestructure/driver-adapter-mock/cashback.provider.mock';
import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import CashbackFactory from './cashback.factory';

describe('CashbackFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return CashbackProvider instance for PROVIDER', () => {
    const instance = CashbackFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(CashbackProvider);
  });

  test('should return CashbackProviderMock instance for MOCK', () => {
    const instance = CashbackFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(CashbackProviderMock);
  });

  test('should return CashbackProvider instance as default', () => {
    const instance = CashbackFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(CashbackProvider);
  });
});
