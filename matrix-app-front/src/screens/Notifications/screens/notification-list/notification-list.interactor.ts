import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import NotificationFactory from 'src/core/modules/notification/infraestructure/factory/notification.factory';
import GetAllNotificationUseCase from 'src/core/modules/notification/domain/use-cases/get-all-notifications/get-all-notifications.use-case';
import OnCreateNotificationUseCase from 'src/core/modules/notification/domain/use-cases/oncreate-notification/oncreate-notification.use-case';
import RemoveNotificationUseCase from 'src/core/modules/notification/domain/use-cases/remove-notification/remove-notification.use-case';
import { Observable } from '@reduxjs/toolkit';
import IGetAllNotificationsRequest from 'src/core/modules/notification/dtos/get-notifications/get-all-notifications-request.interface';
import { INotificationData } from 'src/core/modules/notification/dtos/get-notifications/get-all-notifications';
import { IRemoveNotifications } from 'src/core/modules/notification/dtos/remove-notification/remove-notification';
import { IOncreateNotification } from 'src/core/modules/notification/dtos/oncreate-notification/oncreate-notification';

const useListNotificationsInteractor = (
  getAllNotificationUseCase: IUseCase<
    IGetAllNotificationsRequest,
    INotificationData
  > = new GetAllNotificationUseCase(
    NotificationFactory.getInstance(),
  ),
  onCreateNotificationUseCase: IUseCase<object, Observable<IOncreateNotification>> = new OnCreateNotificationUseCase(
    NotificationFactory.getInstance(),
  ),
  removeNotificationUseCase: IUseCase<string, IRemoveNotifications> = new RemoveNotificationUseCase(
    NotificationFactory.getInstance(),
  ),
) => {
  const executeGetAllNotifications: (pageNum: IGetAllNotificationsRequest) => Promise<INotificationData> = async (pageNum: IGetAllNotificationsRequest) => {
    try {
      return await getAllNotificationUseCase.execute(pageNum);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Notifications/List/interactors/get-notifications.interactor.ts',
        service: 'executeGetAllNotifications',
        error,
      });

      throw error;
    }
  };

  const onCreateNotification: (variables: object) => Promise<Observable<object>> = async (
    variables: object,
  ) => {
    try {
      return await onCreateNotificationUseCase.execute(variables);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Notifications/List/interactors/oncreate-notification.interactor.ts',
        service: 'onCreateNotification',
        error,
      });

      throw error;
    }
  };

  const executeRemoveNotification: (id: string) => Promise<IRemoveNotifications> = async (id: string) => {
    try {
      return await removeNotificationUseCase.execute(id);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'interactors/remove-notification.intereactor.ts',
        service: 'executeRemoveNotification',
        error,
      });

      throw error;
    }
  };

  return {
    executeGetAllNotifications,
    onCreateNotification,
    executeRemoveNotification
  };
};

export default useListNotificationsInteractor;
