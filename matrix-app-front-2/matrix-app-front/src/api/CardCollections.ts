import { baseApi } from './index';

const cardCollectionsServices = {
  getCardCollections: async () => {
    const { data } = await baseApi.get('/v1/me/card-collection');
    return data;
  },
};

export default cardCollectionsServices;
