import { IReplacementCardReissuesRequest } from '../../../dtos/card-offer/replacement-card-reissues.interface';
import { ICardOfferRepository } from '../../../repository/card-offer.repository';
import { replacementCardReissuesToDto } from '../../mappers/card-offer/replacement-card-reissues.serialize';
import ReplacementCardReissuesUseCase from './replacement-card-reissues.use-case';

jest.mock('../../../repository/onboarding.repository');

describe('ReplacementCardReissuesUseCase', () => {
  let replacementCardReissuesUseCase: ReplacementCardReissuesUseCase;
  let mockCardOfferRepository: jest.Mocked<ICardOfferRepository>;

  beforeEach(() => {
    mockCardOfferRepository = {
      replacementCardReissues: jest.fn(),
    } as any;
    replacementCardReissuesUseCase = new ReplacementCardReissuesUseCase(mockCardOfferRepository);
  });

  it('should call repository replacementCardReissues with correct params', async () => {
    const mockDtoParams: IReplacementCardReissuesRequest = {
      cardId: '123',
    };
    const expectedReplacementCardReissues: IReplacementCardReissuesRequest =
      replacementCardReissuesToDto(mockDtoParams);

    await replacementCardReissuesUseCase.execute(mockDtoParams);

    expect(mockCardOfferRepository.replacementCardReissues).toHaveBeenCalledWith(
      expectedReplacementCardReissues,
    );
    expect(mockCardOfferRepository.replacementCardReissues).toHaveBeenCalledTimes(1);
  });
});
