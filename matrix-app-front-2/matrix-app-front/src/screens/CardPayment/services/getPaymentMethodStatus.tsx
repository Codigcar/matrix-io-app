/* eslint-disable prefer-promise-reject-errors */
import axios, { AxiosError } from 'axios';

import { baseApi } from 'src/api';
import { IPostPaymentMethod, PaymentMethodI, getPaymentStatusResponse } from '../types/types';

const BASE = {
  PAYMENTS: '/v1/me/payments',
  PAYMENT_METHOD: '/v1/me/payment-method',
};

const GetPaymentMethod: PaymentMethodI = {
  postPaymentMethod: async (culqi: string): Promise<IPostPaymentMethod> => {
    try {
      const body = { token: culqi };
      const { data } = await baseApi.post<undefined, { data: IPostPaymentMethod }>(
        BASE.PAYMENT_METHOD,
        body,
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return Promise.reject({
          error: axiosError.response?.data,
          status: axiosError.response?.status,
        });
      }
      return Promise.reject({ error: 'default', status: 500 });
    }
  },
  getPaymentMethod: async () => {
    try {
      const { data } = await baseApi.get(BASE.PAYMENT_METHOD);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deletePaymentMethod: async (cardId: string) => {
    const cardDelete = `${BASE.PAYMENT_METHOD}/${cardId}`;
    try {
      const data = await baseApi.delete(cardDelete);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return Promise.reject({
          error: axiosError.response?.data,
          status: axiosError.response?.status,
        });
      }
      return Promise.reject({ error: 'default', status: 500 });
    }
  },
  cardPayment: async (body) => {
    try {
      const { data } = await baseApi.post(BASE.PAYMENTS, body);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return Promise.reject({
          error: axiosError.response?.data,
          status: axiosError.response?.status,
        });
      }
      return Promise.reject({ error: 'default', status: 500 });
    }
  },
  getPaymentStatus: async (methodId: string): Promise<getPaymentStatusResponse> => {
    try {
      const { data } = await baseApi.get(`${BASE.PAYMENTS}/${methodId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        return Promise.reject({
          error: axiosError.response?.data,
          status: axiosError.response?.status,
        });
      }
      return Promise.reject({ error: 'default', status: 500 });
    }
  },
};

export default GetPaymentMethod;
