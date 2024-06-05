import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import CashbackFactory from 'src/core/modules/cashback/infraestructure/factory/cashback.factory';
import { RedemptionUseCase } from 'src/core/modules/cashback/domain/use-case/redemption/redemption.use-case';
import { RedemptionStatusUseCase } from 'src/core/modules/cashback/domain/use-case/redemption-status/redemption-status.use-case';
import { IRedemption } from 'src/core/modules/cashback/dtos/redemption/redemption';
import { IRedemptionResponse } from 'src/core/modules/cashback/dtos/redemption/redemption-response';
import { IRedemptionRequest } from 'src/core/modules/cashback/dtos/redemption/redemption-request';

export const useRedemptionLoadingInteractor = (
  redemptionUseCase: IUseCase<IRedemptionRequest, IRedemption> = new RedemptionUseCase(
    CashbackFactory.getInstance(),
  ),

  redemptionStatusUseCase: IUseCase<string, IRedemptionResponse> =
  new RedemptionStatusUseCase(
    CashbackFactory.getInstance(),
  ),
) => {
  const executeRedemption: (data: IRedemptionRequest) =>
  Promise<IRedemption> = async (data) => {
    try {
      return await redemptionUseCase.execute(data);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Cashback/screens/redemption-loading/redemption-loading.interactor.ts',
        service: 'executeRedemption',
        error,
      });

      throw error;
    }
  };

  const executeRedemptionStatus: (id: string) => Promise<IRedemptionResponse> = async (
    id,
  ) => {
    try {
      return await redemptionStatusUseCase.execute(id);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Cashback/screens/redemption-loading/redemption-loading.interactor.ts',
        service: 'executeGetPaymentStatus',
        error,
      });

      throw error;
    }
  };

  return {
    executeRedemption,
    executeRedemptionStatus,
  };
};
