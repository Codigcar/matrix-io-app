import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import BenefitsFactory from 'src/core/modules/benefits/infraestructure/factory/benefits.factory';
import IObtainBenefits from 'src/core/modules/benefits/dtos/obtain-benefits';
import ObtainBenefitsUseCase from 'src/core/modules/benefits/domain/use-case/obtain-benefits.use-case';

const useBenefitsListInteractor = (
  obtainBenefitsListUseCase: IUseCase<void, IObtainBenefits> = new ObtainBenefitsUseCase(
    BenefitsFactory.getInstance('Provider'),
  ),
) => {
  const executeObtainBenefits: () => Promise<IObtainBenefits> = async () => {
    try {
      return await obtainBenefitsListUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'src/screens/Benefits/modules/benefits-list/benefits-list.interactor.ts',
        service: 'ObtainBenefits',
        error,
      });

      throw error;
    }
  };

  return {
    executeObtainBenefits,
  };
};

export default useBenefitsListInteractor;
