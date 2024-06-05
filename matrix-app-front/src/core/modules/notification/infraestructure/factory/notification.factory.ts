import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import NotificationProvider from 'src/core/modules/notification/infraestructure/driver-adapter/notification.provider';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import NotificationProviderMock from 'src/core/modules/notification/infraestructure/driver-adapter-mock/notification.provider.mock';

class NotificationFactory {
  static getInstance(typeProvider: string = 'provider'): INotificationRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new NotificationProvider();
      case TypeProviderEnum.MOCK:
        return new NotificationProviderMock();
      default:
        return new NotificationProvider();
    }
  }
}

export default NotificationFactory;
