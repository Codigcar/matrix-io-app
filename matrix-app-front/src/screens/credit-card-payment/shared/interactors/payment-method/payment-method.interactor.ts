import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import {
  DeletePaymentMethodUseCase,
  GetPaymentMethodUseCase,
  SetPaymentMethodUseCase,
} from 'src/core/modules/credit-card/payment-method/domain';
import { PaymentMethodFactory } from 'src/core/modules/credit-card/payment-method/infrastructure';
import {
  IPaymentMethod,
  IPaymentMethodRequest,
} from 'src/core/modules/credit-card/payment-method/dtos';
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';

export const usePaymentMethodInteractor = (
  getPaymentMethodUseCase: IUseCase<void, IPaymentMethod[]> = new GetPaymentMethodUseCase(
    PaymentMethodFactory.getInstance(),
  ),
  setPaymentMethodUseCase: IUseCase<
    IPaymentMethodRequest,
    IPaymentMethod
  > = new SetPaymentMethodUseCase(PaymentMethodFactory.getInstance()),
  deletePaymentMethodUseCase: IUseCase<string, void> = new DeletePaymentMethodUseCase(
    PaymentMethodFactory.getInstance(),
  ),
) => {
  // TODO: This is not right since the handleError should be only in the http.implementation
  // TODO: For now he stays here until he discusses error handling with the team.
  const { handleError } = new HttpImplementation();

  const executeSetPaymentMethod = async (
    paymentMethodRequest: IPaymentMethodRequest,
  ): Promise<IPaymentMethod> => {
    try {
      return await setPaymentMethodUseCase.execute(paymentMethodRequest);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'shared/interactors/balance.interactor.tsx',
        service: 'executeSetPaymentMethod',
        error,
      });

      return handleError(error);
    }
  };

  const executeDeletePaymentMethod = async (paymentMethodId: string): Promise<void> => {
    try {
      await deletePaymentMethodUseCase.execute(paymentMethodId);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'shared/interactors/balance.interactor.tsx',
        service: 'executeDeletePaymentMethod',
        error,
      });

      throw error;
    }
  };

  const executeGetPaymentMethods = async (): Promise<IPaymentMethod[]> => {
    try {
      return await getPaymentMethodUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'shared/interactors/balance.interactor.tsx',
        service: 'executeGetPaymentMethod',
        error,
      });

      return handleError(error);
    }
  };

  return { executeSetPaymentMethod, executeDeletePaymentMethod, executeGetPaymentMethods };
};
