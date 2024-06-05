import { baseApi } from './index';

const WalletConfigureServices = {
  registerConsumerWithCard: async (cardId: Object) => {
    try {
      const registerConsumerToThales = '/v1/me/wallets';
      const { data } = await baseApi.post(registerConsumerToThales, cardId);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getWalletSdkToken: async (walletId: string) => {
    try {
      const getThalesToken = `/v1/me/wallets/tokens?card=${walletId}`;
      const { data } = await baseApi.post(getThalesToken);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default WalletConfigureServices;
