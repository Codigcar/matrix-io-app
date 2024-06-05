import { useEffect, useState } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';
import HomeServices from 'src/api/HomeServices';
import { Cashback } from 'src/api/types/cashbackTypes';

interface cashbackProps {
  errorServices: string[];
  setErrorServices: Function;
}
const useCashbackData = ({errorServices, setErrorServices} : cashbackProps) => {
  const [pointCashback, setPointCashback] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorServiceCashback, setErrorServiceCashback] = useState<boolean>(false);

  /** Function to accumulate pointsBalance property. To use with a .reduce
   * @name: accumulator
   * @param: {number} previousValue(accumulator), {Cashback} currentValue(current item)
   * @example: [...].reduce(accumulator, 0) => number
   */
  const accumulator = (previousValue: number, currentValue: Cashback) =>
    previousValue + Number(currentValue.pointsBalance);

  const getCashBack = async () => {
    try {
      setLoading(true);
      const response = await HomeServices.getCashBack();
      setPointCashback(response.reduce(accumulator, 0));
      setErrorServices(errorServices.filter((item) => item !== 'cashback'));
      setErrorServiceCashback(false);
    } catch (error) {
      setErrorServiceCashback(true);
      setErrorServices([...errorServices.filter((item) => item !== 'cashback'), 'cashback']);
      logCrashlytics({
        scope: 'API',
        fileName: 'CashBack/hooks/useCashbackData.tsx',
        service: 'getCashBack',
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCashBack();
  }, []);

  return {
    pointCashback,
    loading,
    errorServiceCashback,
    getCashBack,
  };
};

export default useCashbackData;
