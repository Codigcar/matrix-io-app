import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreditCardDetailInteractor } from 'src/shared/interactors';
import {
  accountBalanceError,
  accountBalanceLoading,
} from 'src/core/libraries-implementation/state-manager/selectors';
import {
  getBalanceReqError,
  getBalanceSuccess,
  getReqBalance,
} from 'src/core/libraries-implementation/state-manager/states';
import { IBalance } from 'src/core/modules/credit-card/credit-card-detail/dtos';

export const useCreditCardBalance = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(accountBalanceLoading);
  const errorServiceBalance = useSelector(accountBalanceError);
  const hasErrorBalance = errorServiceBalance !== null;
  const [balance, setBalance] = useState<IBalance>();
  const { executeGetCCBalance } = useCreditCardDetailInteractor();

  const getBalance = useCallback(async () => {
    dispatch(getReqBalance());
    try {
      const response = await executeGetCCBalance();
      dispatch(getBalanceSuccess(response));
      setBalance(response);
    } catch (error) {
      dispatch(getBalanceReqError(error));
    }
  }, [dispatch, executeGetCCBalance]);

  return {
    available: balance?.available?.PEN.amount ?? 0,
    consumed: {
      PEN: balance?.consumed?.PEN.amount ?? 0,
      USD: balance?.consumed?.USD.amount ?? 0,
    },
    creditLimit: balance?.creditLimit?.PEN.amount ?? 0,
    isLoadingBalance: isLoading,
    errorServiceBalance,
    isDelinquent: balance?.isDelinquent,
    getBalance,
    hasErrorBalance,
  };
};
