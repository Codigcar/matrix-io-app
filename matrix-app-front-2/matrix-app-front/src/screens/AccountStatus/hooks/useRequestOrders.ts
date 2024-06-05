import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountOrdersErrorSelector, accountOrdersLoading } from '../selectors/accountStatusSelectors';
import { getReqOrders } from '../states/ordersState';

const useRequestOrders = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(accountOrdersLoading);
  const ordersError = useSelector(accountOrdersErrorSelector);
  const getPaymentOrders = useCallback(() => {
    dispatch(getReqOrders());
  }, [dispatch]);

  return {
    isLoadingOrders: isLoading,
    hasErrorOrders: Boolean(ordersError),
    getPaymentOrders,
  };
};

export default useRequestOrders;
