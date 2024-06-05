import { IUseCase } from 'src/core/contracts/use-case.interface';
import GetOnboardingDataUseCase from 'src/core/modules/credit-card/settings/card-replacement/domain/use-cases/onboarding/get-onboarding-data.use-case';
import { IOnboardingData } from 'src/core/modules/credit-card/settings/card-replacement/dtos/onboarding/get-onboarding-data.interface';
import OnboardingFactory from 'src/core/modules/credit-card/settings/card-replacement/infrastructure/factory/onboarding.factory';
import { logCrashlytics } from 'src/utils/Analytics';

const useReplacementSummaryOfferInteractor = (
  getOnboardingData: IUseCase<void, IOnboardingData> = new GetOnboardingDataUseCase(
    OnboardingFactory.getInstance(),
  ),
) => {
  // eslint-disable-next-line consistent-return
  const executeGetOnboardingData: () => Promise<IOnboardingData> = async () => {
    try {
      const result = await getOnboardingData.execute();
      if (!result) {
        throw new Error('Onboarding data is undefined.');
      }
      return result;
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName:
          'src/screens/card-replacement/screens/replacement-summary-offer/replacement-summary-offer.interactor.ts',
        service: 'getOnboardingData',
        error,
      });
      throw error;
    }
  };

  return { executeGetOnboardingData };
};

export default useReplacementSummaryOfferInteractor;
