import { CardOfferApiEnum } from 'src/core/enums/services/card-offer-api.enum';
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';

import { GetCardsDto } from '../../dtos/card-offer/get-cards.dto';
import { ICardOfferRepository } from '../../repository/card-offer.repository';
import { ReplacementCardReissuesRequestDto } from '../../dtos/card-offer/replacement-card-reissues.dto';

class CardOfferProvider implements ICardOfferRepository {
  private httpImpl: HttpImplementation;

  constructor(httpImpl: HttpImplementation = new HttpImplementation()) {
    this.httpImpl = httpImpl;
  }

  async getCards(): Promise<GetCardsDto> {
    return this.httpImpl.get(ServicesInstanceEnum.API_INSTANCE, CardOfferApiEnum.CARDS);
  }

  async replacementCardReissues(props: ReplacementCardReissuesRequestDto): Promise<void> {
    const { cardId } = props;
    return this.httpImpl.post(
      ServicesInstanceEnum.API_INSTANCE,
      CardOfferApiEnum.REPLACEMENT_CARD_REISSUES.replace('{cardId}', cardId),
    );
  }
}

export default CardOfferProvider;
