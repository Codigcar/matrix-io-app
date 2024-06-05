import { IUseCase } from 'src/core/contracts/use-case.interface';
import GetCardsUseCase from 'src/core/modules/credit-card/settings/card-replacement/domain/use-cases/card-offer/get-cards.use-case';
import ReplacementCardReissuesUseCase from 'src/core/modules/credit-card/settings/card-replacement/domain/use-cases/card-offer/replacement-card-reissues.use-case';
import { IGetCards } from 'src/core/modules/credit-card/settings/card-replacement/dtos/card-offer/get-cards.interface';
import { IReplacementCardReissuesRequest } from 'src/core/modules/credit-card/settings/card-replacement/dtos/card-offer/replacement-card-reissues.interface';
import CardOfferFactory from 'src/core/modules/credit-card/settings/card-replacement/infrastructure/factory/card-offer.factory';
import { logCrashlytics } from 'src/utils/Analytics';

const useReplacementValidationSuccessInteractor = (
  getCards: IUseCase<void, IGetCards> = new GetCardsUseCase(CardOfferFactory.getInstance()),
  replacementCardReissues: IUseCase<
    IReplacementCardReissuesRequest,
    void
  > = new ReplacementCardReissuesUseCase(CardOfferFactory.getInstance()),
) => {
  // eslint-disable-next-line consistent-return
  const executeGetCards: () => Promise<IGetCards> = async () => {
    try {
      const result = await getCards.execute();
      if (!result) {
        throw new Error('Cards is undefined.');
      }
      return result;
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName:
          'src/screens/card-replacement/screens/replacement-validation-success/replacement-validation-success.interactor.ts',
        service: 'getCards',
        error,
      });
      throw error;
    }
  };

  const executeReplacementCardReissues = async (cardId: string) => {
    try {
      await replacementCardReissues.execute({ cardId });
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName:
          'src/screens/card-replacement/screens/replacement-validation-success/replacement-validation-success.interactor.ts',
        service: 'replacementCardReissues',
        error,
      });
      throw error;
    }
  };

  return { executeGetCards, executeReplacementCardReissues };
};

export default useReplacementValidationSuccessInteractor;
