import { baseApi } from './index';

const offerEndpoints = {
  offers: '/v1/me/leads',
};

const cardOfferServices = {
  getUserOffers: async () => {
    const { data } = await baseApi.get(offerEndpoints.offers);
    return data;
  },
  submitContract: async (leadId: string, leadData: Object) => {
    const getUserOffersRoute = `/v1/me/leads/${leadId}/contract`;
    const { data } = await baseApi.post(getUserOffersRoute, leadData);
    return data;
  },
  getSummarySheet: async (creditLine: number) => {
    const getUserOffersRoute = `/v1/me/leads/documents/resumen?creditLine=${creditLine}`;
    const { data } = await baseApi.get(getUserOffersRoute);
    return data;
  },
  getCards: () => baseApi.get('/v1/me/cards'),
  replacementCardReissues: (cardId: string) => baseApi.post(`/v1/me/cards/${cardId}/reissues`),
};

export default cardOfferServices;
