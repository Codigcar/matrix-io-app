import { useSelector } from 'react-redux';
import { RootState } from 'src/core/libraries-implementation/state-manager/store';

export function useShowBalanceSelectors() {
  const isShowBalance = useSelector(
    (state: RootState) => state.showBalance.isShowBalance,
  );

  return {
    isShowBalance,
  };
}
