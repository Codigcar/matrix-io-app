import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreditCardDetailInteractor } from 'src/shared/interactors';
import {
  accountOrdersErrorSelector,
  accountOrdersLoading,
} from 'src/core/libraries-implementation/state-manager/selectors';
import {
  getOrdersReqError,
  getOrdersSuccess,
  getReqOrders,
} from 'src/core/libraries-implementation/state-manager/states';

export const usePaymentOrder = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(accountOrdersLoading);
  const ordersError = useSelector(accountOrdersErrorSelector);
  const { executeGetCCPaymentOrders } = useCreditCardDetailInteractor();

  const getPaymentOrders = useCallback(async () => {
    dispatch(getReqOrders());
    try {
      const response = await executeGetCCPaymentOrders();
      dispatch(getOrdersSuccess(response));
    } catch (error) {
      dispatch(getOrdersReqError(error));
    }
  }, [dispatch, executeGetCCPaymentOrders]);

  return {
    isLoadingOrders: isLoading,
    hasErrorOrders: Boolean(ordersError),
    getPaymentOrders,
  };
};
