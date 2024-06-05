import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const useCashBackSelectors = () => {
  const account = useSelector(
    (state: RootState) => state.redemption.account,
  );

  const minRedemptionPoints = useSelector(
    (state: RootState) => state.redemption.rules.minRedemptionPoints,
  );

  const pointsExchangeRate = useSelector(
    (state: RootState) => state.redemption.rules.pointsExchangeRate,
  );
  const amountEntered = useSelector(
    (state: RootState) => state.redemption.amountEntered,
  );

  const accumulatedCashback = useSelector(
    (state: RootState) => state.redemption.accumulatedCashback,
  );

  return {
    account,
    minRedemptionPoints,
    pointsExchangeRate,
    amountEntered,
    accumulatedCashback,
  };
};
