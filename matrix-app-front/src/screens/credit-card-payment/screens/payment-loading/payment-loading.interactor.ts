import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import {
  IPayment,
  IPaymentRequest,
  IPaymentStatus,
} from 'src/core/modules/credit-card/payment/dtos';
import {
  PaymentStatusUseCase,
  PaymentUseCase,
} from 'src/core/modules/credit-card/payment/domain';
import { PaymentFactory } from 'src/core/modules/credit-card/payment/infrastructure';

export const usePaymentLoadingInteractor = (
  paymentUseCase: IUseCase<IPaymentRequest, IPayment> = new PaymentUseCase(
    PaymentFactory.getInstance(),
  ),
  paymentStatusUseCase: IUseCase<string, IPaymentStatus> = new PaymentStatusUseCase(
    PaymentFactory.getInstance(),
  ),
) => {
  const executePaymentCreditCard: (data: IPaymentRequest) => Promise<IPayment> = async (data) => {
    try {
      return await paymentUseCase.execute(data);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'auth/interactors/payment-loading.interactor.ts',
        service: 'executePaymentCreditCard',
        error,
      });

      throw error;
    }
  };

  const executeGetPaymentStatus: (methodId: string) => Promise<IPaymentStatus> = async (
    methodId,
  ) => {
    try {
      return await paymentStatusUseCase.execute(methodId);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'auth/interactors/payment-loading.interactor.ts',
        service: 'executeGetPaymentStatus',
        error,
      });

      throw error;
    }
  };

  return {
    executePaymentCreditCard,
    executeGetPaymentStatus,
  };
};
