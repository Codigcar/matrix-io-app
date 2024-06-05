import { GetCardsSchema } from '../../../dtos/card-offer/get-cards.dto';
import { IGetCards } from '../../../dtos/card-offer/get-cards.interface';
import { getCardsToDto } from './get-cards.serialize';

describe('getCardsToDto', () => {
  it('should return valid IGetCards', () => {
    const validGetCards: IGetCards = [
      {
        account: '123',
        id: '123',
        isMain: true,
        reference: '123',
        status: '123',
      },
    ];

    const result = getCardsToDto(validGetCards);
    expect(GetCardsSchema.isValidSync(result)).toBe(true);
    expect(result[0].account).toBe(validGetCards[0].account);
  });
});
