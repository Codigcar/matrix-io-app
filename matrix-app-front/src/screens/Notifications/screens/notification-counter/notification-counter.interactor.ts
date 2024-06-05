import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';

import NotificationFactory from 'src/core/modules/notification/infraestructure/factory/notification.factory';
import GetNotificationCounterUseCase from 'src/core/modules/notification/domain/use-cases/get-notification-counter/get-notification-counter.user-case';
import { INotificationCounter } from 'src/core/modules/notification/dtos/get-notification-counter/get-notifications-counter';

const useNotificationCounterInteractor = (
  getNotificationCounterUseCase: IUseCase<void, INotificationCounter> = new GetNotificationCounterUseCase(
    NotificationFactory.getInstance(),
  ),
) => {
  const executeGetNotificationCounter: () => Promise<INotificationCounter> = async () => {
    try {
      return await getNotificationCounterUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Notifications/Detail/interactors/get-notification-counter.interactor.ts',
        service: 'executeGetNotificationCounter',
        error,
      });

      throw error;
    }
  };

  return {
    executeGetNotificationCounter,
  };
};

export default useNotificationCounterInteractor;
