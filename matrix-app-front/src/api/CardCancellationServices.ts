import { BASE_URL } from 'src/utils/constants';
import CoreServices from 'src/utils/core/CoreServices';
import { baseApi } from '../api';

export interface IDataCardCancellation {
  id: string;
  user: string;
  account: string;
  status: 'PENDING' | 'WAITING_FOR_VALIDATION' | 'COMPLETED';
  registerDate: '2023-01-25';
}
export interface IDataCancellationResponse {
  requestTime: string;
  maskedCard: string;
  requestDate: string;
  pending: {
    type: string;
    value: number;
  };
}

const CardCancellationServices = {
  getCardCancellationRequest: async () => {
    try {
      const { data } = await baseApi.get<undefined, { data: IDataCardCancellation[] }>(
        '/v1/card-accounts/close',
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getCardCancellationReasons: (accessToken: string) => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    const getCardCancellationReasonsRoute = '/v1/card-accounts/close/reasons';
    const serviceData = {
      baseURL: BASE_URL,
      url: getCardCancellationReasonsRoute,
      headers,
    };
    return CoreServices.get(serviceData);
  },
  submitCardCancellation: async (cardAccountCancellationId: string, body: any) => {
    try {
      const { data } = await baseApi.post<undefined, { data: IDataCancellationResponse }>(
        `/v1/card-accounts/${cardAccountCancellationId}/close`,
        body,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default CardCancellationServices;
