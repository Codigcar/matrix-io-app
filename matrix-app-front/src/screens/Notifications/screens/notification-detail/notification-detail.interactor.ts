import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import NotificationFactory from 'src/core/modules/notification/infraestructure/factory/notification.factory';
import ReadNotificationUseCase from 'src/core/modules/notification/domain/use-cases/read-notification/read-notification.use-case';
import ResetNotificationMutationUseCase from 'src/core/modules/notification/domain/use-cases/reset-notification-mutation/reset-notification-mutation.use-case';
import { IReadNotifications } from 'src/core/modules/notification/dtos/read-notifications/read-notifications';
import { IResetNotificationMutation } from 'src/core/modules/notification/dtos/reset-notification-mutation/reset-notification-mutation';

const useNotificationDetailInteractor = (
  readNotificationUseCase: IUseCase<number,IReadNotifications> = new ReadNotificationUseCase(
    NotificationFactory.getInstance(),
  ),
  resetNotificationUseCase: IUseCase<void,IResetNotificationMutation> = new ResetNotificationMutationUseCase(
    NotificationFactory.getInstance(),
  ),
) => {

  const executeReadNotification: (id: number) => Promise<IReadNotifications> = async (id: number) => {
    try {
      return await readNotificationUseCase.execute(id);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'interactors/read-notification.intereactor.ts',
        service: 'executeReadNotification',
        error,
      });

      throw error;
    }
  };

  const executeResetNotificationMutation: () => Promise<IResetNotificationMutation> = async () => {
    try {
      return await resetNotificationUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Notifications/Detail/interactors/reset-notification-counter.interactor.ts',
        service: 'executeResetNotificationMutation',
        error,
      });

      throw error;
    }
  };

  return {
    executeReadNotification,
    executeResetNotificationMutation
  };
};

export default useNotificationDetailInteractor;
