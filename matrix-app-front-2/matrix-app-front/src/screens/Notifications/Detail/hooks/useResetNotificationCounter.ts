import { useEffect, useCallback } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { logCrashlytics } from 'src/utils/Analytics';
import { resetNewNotificationsMutation } from '../../graphql/schema';

interface QueryGetNotificationCounter {
  getNotificationCounter: number;
};

export const useResetNotificationCounter = () => {

  const fetchNotificationReset = useCallback(async () => {
    try {
      await API.graphql(
        graphqlOperation(resetNewNotificationsMutation)
      ) as { data: QueryGetNotificationCounter };
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
