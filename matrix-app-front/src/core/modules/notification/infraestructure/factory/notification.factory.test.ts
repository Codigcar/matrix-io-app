import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import NotificationProvider from 'src/core/modules/notification/infraestructure/driver-adapter/notification.provider';
import NotificationFactory from 'src/core/modules/notification/infraestructure/factory/notification.factory';
import NotificationProviderMock from '../driver-adapter-mock/notification.provider.mock';

describe('NotificationFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return NotificationFactory instance for PROVIDER', () => {
    const instance = NotificationFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(NotificationProvider);
  });

  test('should return NotificationFactory instance for MOCK', () => {
    const instance = NotificationFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(NotificationProviderMock);
  });

  test('should return NotificationFactory instance as default', () => {
    const instance = NotificationFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(NotificationProvider);
  });
});
