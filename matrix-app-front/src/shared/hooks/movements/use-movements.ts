import { useCallback, useMemo, useState } from 'react';
import { IHistoryMovements } from 'src/core/modules/account-status/dtos';
import { logCrashlytics } from 'src/utils/Analytics';
import { formatDate } from 'src/utils/date-time/date-time';
import { useMovementsInteractor } from 'src/shared/interactors';
import { useUserSelectors } from 'src/core/libraries-implementation/state-manager/selectors';

export const useMovementDate = () => {
  const { accountId } = useUserSelectors();
  const [listMovements, setListMovements] = useState<IHistoryMovements[]>([]);
  const [loadingMovements, setLoadingMovements] = useState(false);
  const [isErrorListMovements, setIsErrorListMovements] = useState<boolean>(false);
  const { executeGetHistoryMovementsByAccountId } = useMovementsInteractor();

  const handlerRequestMovements = useCallback(async (): Promise<void> => {
    try {
      if (!accountId) return;
      setIsErrorListMovements(false);
      setLoadingMovements(true);
      const result = await executeGetHistoryMovementsByAccountId(accountId);
      const listHistoryMovements = result?.map((date) => ({
        ...date,
        period: formatDate(
          `${date.period.slice(4, 6)}-${date.period.slice(0, 4)}`,
          'MMM YYYY',
          'MM-YYYY',
        ),
        title: formatDate(
          `${date.period.slice(4, 6)}-${date.period.slice(0, 4)}`,
          'MMMM YYYY',
          'MM-YYYY',
        ),
      }));

      setListMovements(listHistoryMovements);
      setLoadingMovements(false);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'AccountStatus/hooks/useMovementDate().tsx',
        service: 'GetDataAccountStatus.getHistoryMovements',
        error,
      });
      setLoadingMovements(false);
      setIsErrorListMovements(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId]);

  useMemo(() => {
    handlerRequestMovements();
  }, [handlerRequestMovements]);

  return {
    listMovements,
    loadingMovements,
    isErrorListMovements,
    fetchListMovements: handlerRequestMovements,
  };
};
