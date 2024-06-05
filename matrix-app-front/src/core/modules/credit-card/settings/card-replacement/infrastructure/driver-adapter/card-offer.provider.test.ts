import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import { GetCardsDto } from '../../dtos/card-offer/get-cards.dto';
import { ReplacementCardReissuesRequestDto } from '../../dtos/card-offer/replacement-card-reissues.dto';
import CardOfferProvider from './card-offer.provider';

describe('CardOfferProvider', () => {
  let cardOfferProvider: CardOfferProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = {
      get: jest.fn(),
      post: jest.fn(),
    } as any;
    cardOfferProvider = new CardOfferProvider(mockHttpImpl);
  });

  it('should call httpImpl get and return the response', async () => {
    const mockResponse: GetCardsDto = [
      {
        account: '1',
        id: '1',
        isMain: true,
        reference: '1',
        status: '1',
      },
    ];

    mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

    const result = await cardOfferProvider.getCards();

    expect(mockHttpImpl.get).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  it('should call httpImpl post and return the response', async () => {
    const mockRequest: ReplacementCardReissuesRequestDto = {
      cardId: '123',
    };

    mockHttpImpl.post.mockResolvedValueOnce();

    await cardOfferProvider.replacementCardReissues(mockRequest);

    expect(mockHttpImpl.post).toHaveBeenCalled();
  });
});
