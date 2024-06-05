import { baseApi } from 'src/api';
import type {
  BalanceResponse,
  HistoryMovementsResponse,
  MovementResponse,
  PaymentOrderResponse,
} from './getDataAccountStatus.types';
import type { AccountStatementByDateIdProps } from '../types/types';

const BASE = {
  GET_BALANCE: '/v1/me/balance',
  GET_PAYMENT_ORDERS: '/v1/me/payment-orders',
  ACCOUNT_STATEMENTS: '/v1/me/accounts-statements',
};

const GetDataAccountStatus = {
  getBalance: async (): Promise<BalanceResponse[]> => {
    const { data } = await baseApi.get<BalanceResponse[]>(BASE.GET_BALANCE);
    return data;
  },
  getOrders: async (): Promise<PaymentOrderResponse[]> => {
    const { data } = await baseApi.get<PaymentOrderResponse[]>(BASE.GET_PAYMENT_ORDERS);
    return data;
  },
  getAccountStatementByDateId: async ({
    dateId,
    isEncrypted,
  }: AccountStatementByDateIdProps): Promise<MovementResponse> => {
    const url = `${BASE.ACCOUNT_STATEMENTS}/${dateId}/download?encrypt=${isEncrypted}`;
    const { data } = await baseApi.get<MovementResponse>(url);
    return data;
  },
  getHistoryMovements: async (accountId: string): Promise<HistoryMovementsResponse[]> => {
    const { data } = await baseApi.get<HistoryMovementsResponse[]>(
      `${BASE.ACCOUNT_STATEMENTS}?accountId=${accountId}`,
    );
    return data;
  },
};

export default GetDataAccountStatus;
