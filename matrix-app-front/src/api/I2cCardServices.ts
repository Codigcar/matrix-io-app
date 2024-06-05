import { baseApi } from './index';
import { CardProps } from './types/cardOperationsTypes';

const I2cCardServices = {
  getCards: async () => {
    const { data } = await baseApi.get<undefined, { data: CardProps[] }>('/v1/me/cards');
    return data;
  },
  getCardSignature: async (cardId: string) => {
    const { data } = await baseApi.get<any>(`/v1/me/cards/${cardId}/signature`);
    return data;
  },
};

export default I2cCardServices;
