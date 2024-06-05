import {
  TransactionFilterProps,
  TransactionsProps,
  LastTransactionProps,
} from './types/TransactionTypes';
import { baseApi } from './index';
import { AxiosRequestConfig } from 'axios';

const transactions = {
  list: '/v1/me/transactions?',
  last: '/v1/me/transactions/last',
};

const getTransactions = async (filters: TransactionFilterProps, config?: AxiosRequestConfig, operation?:string): Promise<TransactionsProps> => {
  const date = `startDate=${filters.startDate}&endDate=${filters.endDate}`;
  const metadata = `&limit=${filters.limit || 10}&skip=${filters.skip || 0}`;
  const operationType = `&operation=${operation}`;
  const url = `${transactions.list}${date}${metadata}${operationType}`; 

  const { data } = await baseApi.get(url, config)
  
  return data;
};

const getLastTransaction = async (): Promise<LastTransactionProps> => {
  const { data } = await baseApi.get(transactions.last);
  return data;
};

export { getTransactions, getLastTransaction };