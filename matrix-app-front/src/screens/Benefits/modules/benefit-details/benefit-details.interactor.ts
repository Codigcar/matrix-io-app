import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import BenefitsFactory from 'src/core/modules/benefits/infraestructure/factory/benefits.factory';
import IObtainBenefit from 'src/core/modules/benefits/dtos/obtain-benefit';
import ObtainBenefitUseCase from 'src/core/modules/benefits/domain/use-case/obtain-benefit.use-case';
import CopyTextUseCase from 'src/core/modules/clipboard/domain/use-case/copy-text.use-case';
import ClipboardFactory from 'src/core/modules/clipboard/infraestructure/factory/clipboard.factory';

const useBenefitDetailsInteractor = (
  benefitDetailsUseCase: IUseCase<any, IObtainBenefit> = new ObtainBenefitUseCase(
    BenefitsFactory.getInstance('Provider'),
  ),
  copyTextUseCase: IUseCase<string, void> = new CopyTextUseCase(ClipboardFactory.getInstance()),
) => {
  const executeObtainBenefit: (data: any) => Promise<IObtainBenefit> = async (data) => {
    try {
      return await benefitDetailsUseCase.execute(data);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'src/screens/Benefits/modules/benefit-details/benefit-details.interactor.ts',
        service: 'ObtainBenefit',
        error,
      });

      throw error;
    }
  };

  const executeCopyCode: (text: string) => void = (text) => {
    try {
      copyTextUseCase.execute(text);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'src/screens/Benefits/modules/benefit-details/benefit-details.interactor.ts',
        service: 'CopyCode',
        error,
      });

      throw error;
    }
  };

  return {
    executeObtainBenefit,
    executeCopyCode,
  };
};

export default useBenefitDetailsInteractor;
