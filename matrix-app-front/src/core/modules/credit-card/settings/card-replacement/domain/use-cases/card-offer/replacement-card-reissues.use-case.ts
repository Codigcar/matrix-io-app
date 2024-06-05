import { IUseCase } from 'src/core/contracts/use-case.interface';

import { IReplacementCardReissuesRequest } from '../../../dtos/card-offer/replacement-card-reissues.interface';
import { ICardOfferRepository } from '../../../repository/card-offer.repository';
import { replacementCardReissuesToDto } from '../../mappers/card-offer/replacement-card-reissues.serialize';

class ReplacementCardReissuesUseCase implements IUseCase<IReplacementCardReissuesRequest, void> {
  public repository: ICardOfferRepository;

  constructor(repository: ICardOfferRepository) {
    this.repository = repository;
  }

  public async execute(props: IReplacementCardReissuesRequest): Promise<void> {
    const request = replacementCardReissuesToDto(props);
    await this.repository.replacementCardReissues(request);
  }
}

export default ReplacementCardReissuesUseCase;
