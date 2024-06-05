import { ReplacementCardReissuesScheme } from '../../../dtos/card-offer/replacement-card-reissues.dto';
import { IReplacementCardReissuesRequest } from '../../../dtos/card-offer/replacement-card-reissues.interface';
import { replacementCardReissuesToDto } from './replacement-card-reissues.serialize';

describe('getCardsToDto', () => {
  it('should return valid IReplacementCardReissuesRequest', () => {
    const replacementCardReissuesRequest: IReplacementCardReissuesRequest = {
      cardId: '123',
    };

    const result = replacementCardReissuesToDto(replacementCardReissuesRequest);

    expect(ReplacementCardReissuesScheme.isValidSync(result)).toBe(true);
    expect(result.cardId).toBe(replacementCardReissuesRequest.cardId);
  });
});
