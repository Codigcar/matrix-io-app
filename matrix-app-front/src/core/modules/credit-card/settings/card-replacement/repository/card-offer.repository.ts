import { GetCardsDto } from '../dtos/card-offer/get-cards.dto';
import { ReplacementCardReissuesRequestDto } from '../dtos/card-offer/replacement-card-reissues.dto';

export interface ICardOfferRepository {
  getCards(): Promise<GetCardsDto>;
  replacementCardReissues(props: ReplacementCardReissuesRequestDto): Promise<void>;
}
