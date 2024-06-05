import { baseApi } from './index';
import { CashbackResponse } from './types/cashbackTypes';

const BASE = {
  GET_BALANCE: '/v1/me/balance',
  GET_ORDERS: '/v1/me/payment-orders',
  GET_MISTERY: '/v1/me/benefits',
  GET_CASHBACK: '/v1/me/cashback',
};

const HomeServices = {
  getBalance: async () => {
    try {
      const { data } = await baseApi.get(BASE.GET_BALANCE);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getOrders: async () => {
    try {
      const { data } = await baseApi.get(BASE.GET_ORDERS);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getMysteryGift: () => {
    const getMysteryGiftRoute = BASE.GET_MISTERY;
    return baseApi.get(getMysteryGiftRoute);
  },
  getCashBack: async (): Promise<CashbackResponse> => {
    const { data } = await baseApi.get<CashbackResponse>(BASE.GET_CASHBACK);
    return data;
  },
};

export default HomeServices;
