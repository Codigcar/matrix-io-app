import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  accountBalanceError,
  accountBalanceLoading,
  accountBalanceSelector,
} from '../selectors/accountStatusSelectors';
import { getReqBalance } from '../states/balanceState';

const useRequestBalance = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(accountBalanceLoading);
  const balance = useSelector(accountBalanceSelector);
  const errorServiceBalance = useSelector(accountBalanceError);
  const hasErrorBalance = errorServiceBalance !== null;

  const getBalance = useCallback(() => {
    dispatch(getReqBalance());
  }, [dispatch]);

  const amount = balance[0]?.consumed.details[0].amount;
  const balanceAmount = balance[0]?.creditLimit.amount;
  const percentTotalSpending = balance[0]?.consumed.details[0]?.amount
    ? (amount * 100) / balanceAmount
    : 0;

  return {
    available: balance[0]?.available?.amount ?? 0,
    consumed: {
      PEN: balance[0]?.consumed?.amount ?? 0,
    },
    creditLimit: balance[0]?.creditLimit?.amount ?? 0,
    percentTotalSpending,
    isLoadingBalance: isLoading,
    errorServiceBalance,
    getBalance,
    hasErrorBalance,
  };
};

export default useRequestBalance;
