import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export function usePaymentMethodSelectors() {
  const isLoading = useSelector(
    (state: RootState) => state.account?.paymentMethod?.isLoading,
  );
  const isLoadingDelete = useSelector(
    (state: RootState) => state.account?.paymentMethod?.isLoadingDeletePaymentMethod,
  );
  const isFinishDeleteSuccess = useSelector(
    (state: RootState) => state.account?.paymentMethod?.isFinishDeleteSuccess,
  );
  const isFinishSetSuccess = useSelector(
    (state: RootState) => state.account?.paymentMethod?.isFinishSetSuccess,
  );
  const paymentMethods = useSelector(
    (state: RootState) => state.account?.paymentMethod?.paymentMethods,
  );
  const paymentMethodError = useSelector(
    (state: RootState) => state.account?.paymentMethod?.paymentMethodError,
  );
  const paymentCardError = useSelector(
    (state: RootState) => state.account?.paymentMethod?.paymentCardError,
  );
  const cardsPaymentMethods = useSelector(
    (state: RootState) => state.account?.paymentMethod?.cardsPaymentMethods,
  );

  return {
    isLoading,
    isLoadingDelete,
    isFinishDeleteSuccess,
    paymentMethods,
    paymentMethodError,
    paymentCardError,
    cardsPaymentMethods,
    isFinishSetSuccess,
  };
}
