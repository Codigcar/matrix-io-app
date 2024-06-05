import { IUseCase } from 'src/core/contracts/use-case.interface';

import { IGetCards } from '../../../dtos/card-offer/get-cards.interface';
import { ICardOfferRepository } from '../../../repository/card-offer.repository';
import { getCardsToDto } from '../../mappers/card-offer/get-cards.serialize';

class GetCardsUseCase implements IUseCase<void, IGetCards> {
  public repository: ICardOfferRepository;

  constructor(repository: ICardOfferRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IGetCards> {
    const response = await this.repository.getCards();
    return getCardsToDto(response);
  }
}

export default GetCardsUseCase;
