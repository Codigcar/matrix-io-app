type TransactionStatus = 'RECHAZADA' | 'PROCESSED' | 'BILLED';
type TransactionFilterValue = 'virtual' | 'payment' | 'physical';

type TransactionFilterType = {
  label: string;
  key: TransactionFilterValue;
  checked: boolean;
  isVisible: boolean;
  values: string[];
  code: string;
};

type TransactionFilterProps = {
  startDate?: string;
  endDate?: string;
  limit?: number;
  skip?: number;
  page?: number;
  operation?: string;
};

type TransactionProps = {
  id: string;
  description: string;
  type: string;
  maskedCardNumber: string;
  cardReference: string;
  byDigitalWallet: boolean;
  totalAmount: {
    value: number;
    currencyCode: string;
    sign: string;
    formatted: string;
  };
  mcc: string;
  acceptorNameAndLocation: string;
  date: string;
  status: TransactionStatus;
  time: string;
  processingDate: string;
  alias: string;
  operationAccountType: string;
};

type TransactionGroup = {
  date: string;
  items: TransactionProps[];
};

type PaginationProps = {
  skip: number;
  totalCount: number;
  filters: Array<string>;
};

type TransactionsProps = {
  page: PaginationProps;
  data: TransactionGroup[];
};

type LastTransactionData = {
  acceptorNameAndLocation: string;
  amount: number;
  businessDate: string;
  date: string;
  description: string;
  deviceType: string;
  id: string;
  maskedCardNumber: string;
  mcc: string;
  messageTypeIdentifier: string;
  panSequenceNo: string;
  processingDate: string;
  time: string;
  type: string;
  totalAmount: {
    currencyCode: string;
    formatted: string;
    sign: string;
    symbol: string;
    value: string;
  };
};

type LastTransactionProps = {
  data: LastTransactionData[];
};

export type {
  TransactionFilterProps,
  TransactionFilterType,
  TransactionGroup,
  TransactionProps,
  TransactionStatus,
  TransactionsProps,
  LastTransactionData,
  LastTransactionProps,
};