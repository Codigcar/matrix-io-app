import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast, ToastType } from 'src/matrix-ui-components/components/toast';
import { logCrashlytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import { paymentMethodsSelector } from '../selectors/paymentSelector';
import GetPaymentMethod from '../services/getPaymentMethodStatus';
import { deletePaymentMethod } from '../states/paymentState';
import { CardData } from './useListMethodPayments';

interface UseDeleteMethodPaymentReturnType {
  handleDeleteMethodPayment: (cardId: string) => Promise<void | boolean>;
  deleteLoading: boolean;
}

const useDeleteMethodPayment = (): UseDeleteMethodPaymentReturnType => {
  const dispatch = useDispatch();
  const paymentMethods = useSelector(paymentMethodsSelector);
  const [loading, setLoading] = useState(false);

  const handleDeleteMethodPayment: (cardId: string) => Promise<void | boolean> = async (cardId) => {
    setLoading(true);
    try {
      const cardDelete = await GetPaymentMethod.deletePaymentMethod(cardId);
      if (cardDelete?.status === 204) {
        const methodDelete = paymentMethods.filter((method: CardData) => method.id !== cardId);
        dispatch(deletePaymentMethod(methodDelete));
        showToast({ type: ToastType.Success, title: i18n.t('cardPayment.method-deleted') });
        return true;
      }
      throw new Error();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CardPayment/hooks/useDeleteMethodPayment.tsx',
        service: 'GetPaymentMethod.deletePaymentMethod',
        error,
      });
      showToast({ type: ToastType.Error, title: i18n.t('cardPayment.method-deleted-error') });
      return false;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  };

  return { handleDeleteMethodPayment, deleteLoading: loading };
};
export default useDeleteMethodPayment;
