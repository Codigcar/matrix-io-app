import { useSelector } from 'react-redux';

export function useShowBalanceSelectors() {
  const isShowBalance = useSelector(
    (state: RootState) => state.showBalance.isShowBalance,
  );

  return {
    isShowBalance,
  };
}
