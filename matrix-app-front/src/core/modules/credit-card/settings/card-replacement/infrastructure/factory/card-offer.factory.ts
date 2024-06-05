import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { ICardOfferRepository } from '../../repository/card-offer.repository';
import CardOfferProvider from '../driver-adapter/card-offer.provider';
import CardOfferProviderMock from '../driver-adapter-mock/card-offer.provider.mock';

class CardOfferFactory {
  static getInstance(typeProvider: string = 'provider'): ICardOfferRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new CardOfferProvider();
      case TypeProviderEnum.MOCK:
        return new CardOfferProviderMock();
      default:
        return new CardOfferProvider();
    }
  }
}

export default CardOfferFactory;
