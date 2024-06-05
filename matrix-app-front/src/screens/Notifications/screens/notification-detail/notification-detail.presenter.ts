import { useEffect, useCallback } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';
import useNotificationDetailInteractor from './notification-detail.interactor';

interface QueryGetNotificationCounter {
  getNotificationCounter: number;
}

export const useResetNotificationCounter = () => {
  const { executeResetNotificationMutation } = useNotificationDetailInteractor();

  const fetchNotificationReset = useCallback(async () => {
    try {
      (await executeResetNotificationMutation()) as {
        data: QueryGetNotificationCounter;
      };
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'hooks/useResetNotificationsCounter.ts',
        service: 'notification counter reset',
        error,
      });
    }
  }, []);

  useEffect(() => {
    fetchNotificationReset();
  }, [fetchNotificationReset]);
};
