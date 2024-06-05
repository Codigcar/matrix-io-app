import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import { CreditCardDetailFactory } from 'src/core/modules/credit-card/credit-card-detail/infrastructure';
import { IBalance, IPaymentOrder } from 'src/core/modules/credit-card/credit-card-detail/dtos';
import { GetBalanceUseCase, GetPaymentOrdersUseCase } from 'src/core/modules/credit-card/credit-card-detail/domain';

export const useCreditCardDetailInteractor = (
  getBalanceUseCase: IUseCase<void, IBalance> = new GetBalanceUseCase(
    CreditCardDetailFactory.getInstance(),
  ),
  getPaymentOrdersUseCase: IUseCase<void, IPaymentOrder[]> = new GetPaymentOrdersUseCase(
    CreditCardDetailFactory.getInstance(),
  ),
) => {
  const executeGetCCBalance = async (): Promise<IBalance> => {
    try {
      return await getBalanceUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'shared/interactors/balance.interactor.tsx',
        service: 'executeGetCCBalance',
        error,
      });

      throw error;
    }
  };

  const executeGetCCPaymentOrders = async (): Promise<IPaymentOrder[]> => {
    try {
      return await getPaymentOrdersUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'shared/interactors/balance.interactor.tsx',
        service: 'executeGetCCPaymentOrders',
        error,
      });

      throw error;
    }
  };
  return { executeGetCCBalance, executeGetCCPaymentOrders };
};
