import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Cashback } from 'src/api/types/cashbackTypes';
import IObtainCashback from 'src/core/modules/cashback/dtos/obtain-cashback/obtain-cashback';
import IObtainCashbackRules from 'src/core/modules/cashback/dtos/obtain-cashback-rule/obtain-rules';
import { useAppDispatch } from 'src/core/libraries-implementation/state-manager/dispatch';
import { setRules, setAccount } from 'src/core/libraries-implementation/state-manager/states/credit-card/cashback/redemption.state';
import useCashbackInteractor from './cashback.interactor';

export interface CashbackPresenterProps {
  errorServices: string[];
  setErrorServices: Function;
  disabled?: boolean;
  onPress: () => void;
}

export const useCashbackPresenter = (props: CashbackPresenterProps) => {
  const {
    errorServices, setErrorServices, disabled = false, onPress,
  } = props;
  const [pointCashback, setPointCashback] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorServiceCashback, setErrorServiceCashback] = useState<boolean>(false);
  const cashbackInteractor = useCashbackInteractor();
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  /** Function to accumulate pointsBalance property. To use with a .reduce
   * @name: accumulator
   * @param: {number} previousValue(accumulator), {Cashback} currentValue(current item)
   * @example: [...].reduce(accumulator, 0) => number
   */
  const accumulator = (previousValue: number, currentValue: Cashback) => previousValue + Number(currentValue.pointsBalance);

  const getCashBack = async () => {
    try {
      setLoading(true);
      const response: IObtainCashback = await cashbackInteractor.executeGetCashback();
      setPointCashback(response.reduce(accumulator, 0));
      dispatch(setAccount(response[0].account));
      setErrorServices(errorServices.filter((item) => item !== 'cashback'));
      setErrorServiceCashback(false);
    } catch (error) {
      setErrorServiceCashback(true);
      setErrorServices([...errorServices.filter((item) => item !== 'cashback'), 'cashback']);
    } finally {
      setLoading(false);
    }
  };

  const getRedemptionRules = async () => {
    try {
      setLoading(true);
      const response: IObtainCashbackRules = await cashbackInteractor.executeGetCashbackRule();
      dispatch(setRules(response));
    } finally {
      setLoading(false);
    }
  };

  const onPressCardCashback = () => getRedemptionRules().then(onPress);
  const onPressHandler = !loading && !errorServiceCashback ? onPressCardCashback : getCashBack;

  useEffect(() => {
    if (isFocused) {
      getCashBack();
    }
  }, [isFocused]);

  return {
    pointCashback,
    loading,
    errorServiceCashback,
    disabled,
    onPressHandler,
  };
};
