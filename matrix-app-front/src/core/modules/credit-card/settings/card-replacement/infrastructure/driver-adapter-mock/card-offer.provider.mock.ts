/* eslint-disable no-console */
import { GetCardsDto } from '../../dtos/card-offer/get-cards.dto';
import { ReplacementCardReissuesRequestDto } from '../../dtos/card-offer/replacement-card-reissues.dto';
import { ICardOfferRepository } from '../../repository/card-offer.repository';

class CardOfferProviderMock implements ICardOfferRepository {
  public async getCards(): Promise<GetCardsDto> {
    return [
      {
        account: 'mockedAccount',
        id: 'mockedId',
        isMain: true,
        reference: 'mockedReference',
        status: 'mockedStatus',
      },
      {
        account: 'mockedAccount',
        id: 'mockedId2',
        isMain: false,
        reference: 'mockedReference',
        status: 'mockedStatus',
      },
    ];
  }

  public async replacementCardReissues(props: ReplacementCardReissuesRequestDto): Promise<void> {
    const { cardId } = props;
    console.log('Card replaced Mocked', cardId);
  }
}

export default CardOfferProviderMock;
