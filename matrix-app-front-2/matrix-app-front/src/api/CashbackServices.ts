import { baseApi } from './index';
import {
  RedemptionProcessingResponse,
  RedemptionStatusResponse,
} from './types/cashbackTypes';

const REDEMPTION_PROCESSING = '/v1/me/cashback/redemptions';
const REDEMPTION_STATUS = '/v1/me/cashback/redemptions/';

const CashbackServices = {

  redemptionProcessing: async (redemptionProcessingRequest: Object) => {
    try {
      const { data } = await baseApi.post<RedemptionProcessingResponse>(`${REDEMPTION_PROCESSING}`, redemptionProcessingRequest);
      return data;
    } catch (error) {
      throw Promise.reject(error);
    }
  },

  redemptionStatus: async (redemptionId: string) => {
    try {
      const { data } = await baseApi.get<RedemptionStatusResponse>(`${REDEMPTION_STATUS}${redemptionId}`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

};

export default CashbackServices;
