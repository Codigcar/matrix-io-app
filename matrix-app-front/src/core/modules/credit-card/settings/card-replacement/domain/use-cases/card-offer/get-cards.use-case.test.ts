import { IGetCards } from '../../../dtos/card-offer/get-cards.interface';
import { ICardOfferRepository } from '../../../repository/card-offer.repository';
import { getCardsToDto } from '../../mappers/card-offer/get-cards.serialize';
import GetCardsUseCase from './get-cards.use-case';

jest.mock('../../../repository/card-offer.repository');

describe('GetCardsUseCase', () => {
  let getCardsUseCase: GetCardsUseCase;
  let mockCardOfferRepository: jest.Mocked<ICardOfferRepository>;

  beforeEach(() => {
    mockCardOfferRepository = {
      getCards: jest.fn(),
    } as any;
    getCardsUseCase = new GetCardsUseCase(mockCardOfferRepository);
  });

  it('should call repository getCards and return the serialized response', async () => {
    const mockDtoResponse: IGetCards = [
      {
        account: '123',
        id: '123',
        isMain: true,
        reference: '123',
        status: '123',
      },
    ];
    const expectedGetCards: IGetCards = getCardsToDto(mockDtoResponse);

    mockCardOfferRepository.getCards.mockResolvedValueOnce(mockDtoResponse);

    const result = await getCardsUseCase.execute();

    expect(mockCardOfferRepository.getCards).toHaveBeenCalled();
    expect(result).toEqual(expectedGetCards);
  });
});
