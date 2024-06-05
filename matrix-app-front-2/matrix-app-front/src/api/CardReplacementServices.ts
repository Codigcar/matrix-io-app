import { baseApi } from './index';

const cardsEndpoints = {
  cards: '/v1/me/cards',
};
const cardReplacementServices = {
  replacementCardReissues: async (cardId: string) => {
    const url = `${cardsEndpoints.cards}/${cardId}/reissues`;
    const { data } = await baseApi.post(url);
    return data;
  },
};
export default cardReplacementServices;
