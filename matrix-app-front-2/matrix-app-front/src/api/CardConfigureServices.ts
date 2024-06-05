import { baseApi } from './index';
import { CardProps } from './types/cardOperationsTypes';
import { TRestrictionRequest } from './types/cardConfigurationTypes';

const CardConfigureServices = {
  getCards: async () => {
    const { data } = await baseApi.get<undefined, { data: CardProps[] }>('/v1/me/cards');
    return data;
  },
  getCardRestrictions: async (cardId: string) => {
    const { data } = await baseApi.get(`/v1/me/cards/${cardId}/restrictions`);
    return data;
  },
  getCardRestrictionsAll: async () => {
    const { data } = await baseApi.get('/v1/me/cards/restrictions');
    return data;
  },
  changeCardEnabled: async (cardId: string, enabled: boolean) => {
    try {
      const cardEnabledRoute = `/v1/me/cards/${cardId}/lock?enabled=${enabled.toString()}`;
      const { data } = await baseApi.patch(cardEnabledRoute);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  cardRestrictionsApply: async (cardRestriction: TRestrictionRequest) => {
    try {
      const cardRestrictionsApplyRoute = '/v1/me/cards/restrictions';
      const { data } = await baseApi.post(cardRestrictionsApplyRoute, cardRestriction);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  cardRestrictionsRemove: async (cardRestriction: TRestrictionRequest) => {
    try {
      const cardRestrictionsRemoveRoute = '/v1/me/cards/restrictions';
      const { data } = await baseApi.delete(cardRestrictionsRemoveRoute, {
        data: cardRestriction,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default CardConfigureServices;
