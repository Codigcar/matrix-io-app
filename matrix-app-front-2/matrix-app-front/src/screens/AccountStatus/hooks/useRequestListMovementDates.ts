import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { accountIDSelector } from 'src/screens/CardPayment/selectors/paymentSelector';
import { logCrashlytics } from 'src/utils/Analytics';
import { formatDate } from 'src/utils/date-time/date-time';
import { PeriodDates } from '../types/types';
import GetDataAccountStatus from '../services/getDataAccountStatus';

const useRequestListMovementDates = () => {
  const accountId = useSelector(accountIDSelector);
  const [listMovements, setListMovements] = useState<PeriodDates[]>([]);
  const [loadingMovements, setLoadingMovements] = useState(false);
  const [isErrorListMovements, setIsErrorListMovements] = useState<boolean>(false);

  const handlerRequestMovements = useCallback(async (): Promise<void> => {
    try {
      if (!accountId) return;
      setIsErrorListMovements(false);
      setLoadingMovements(true);
      const result = await GetDataAccountStatus.getHistoryMovements(accountId);
      const listHistoryMovements = result.map((date) => ({
        ...date,
        period: formatDate(`${date.period.slice(4, 6)}-${date.period.slice(0, 4)}`, 'MMM YYYY', 'MM-YYYY'),
        title: formatDate(`${date.period.slice(4, 6)}-${date.period.slice(0, 4)}`, 'MMMM YYYY', 'MM-YYYY'),
      }));

      setListMovements(listHistoryMovements);
      setLoadingMovements(false);
    } catch (error) {
      logCrashlytics({
        scope: 'API', fileName: 'AccountStatus/hooks/useRequestListMovementDates.tsx', service: 'GetDataAccountStatus.getHistoryMovements', error,
      });
      setLoadingMovements(false);
      setIsErrorListMovements(true);
    }
  }, [accountId]);

  useEffect(() => {
    handlerRequestMovements();
  }, [handlerRequestMovements]);

  return {
    listMovements,
    loadingMovements,
    isErrorListMovements,
    fetchListMovements: handlerRequestMovements,
  };
};

export default useRequestListMovementDates;
