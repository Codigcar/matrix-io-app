import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import CashbackFactory from 'src/core/modules/cashback/infraestructure/factory/cashback.factory';
import ObtainCashbackUseCase from 'src/core/modules/cashback/domain/use-case/obtain-cashback.use-case';
import IObtainCashback from 'src/core/modules/cashback/dtos/obtain-cashback';
import IObtainCashbackRule from 'src/core/modules/cashback/dtos/obtain-rules';
import ObtainCashbackRuleUseCase from 'src/core/modules/cashback/domain/use-case/obtain-cashbackRule.use-case';

const useCashbackInteractor = (
  obtainCashbackUseCase: IUseCase<void, IObtainCashback> = new ObtainCashbackUseCase(
    CashbackFactory.getInstance(),
  ),
  obtainRedemptionRuleUseCase: IUseCase<void, IObtainCashbackRule> = new ObtainCashbackRuleUseCase(
    CashbackFactory.getInstance(),
  ),
) => {
  const executeGetCashback: () => Promise<IObtainCashback> = async () => {
    try {
      return await obtainCashbackUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CashBack/cashback.interactor.tsx',
        service: 'ObtainCashback',
        error,
      });

      throw error;
    }
  };

  const executeGetCashbackRule: () => Promise<IObtainCashbackRule> = async () => {
    try {
      return await obtainRedemptionRuleUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CashBack/cashback.interactor.tsx',
        service: 'ObtainCashbackRule',
        error,
      });

      throw error;
    }
  };
  return { executeGetCashback, executeGetCashbackRule };
};

export default useCashbackInteractor;
