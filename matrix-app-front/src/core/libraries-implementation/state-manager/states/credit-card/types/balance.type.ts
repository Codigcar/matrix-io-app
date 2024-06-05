export interface PaymentOrder {
  accountId: string;
  total: {
    amount: number;
    currency: string;
  };
  endDate: string;
  dueDate: string;
  pending: {
    amount: number;
    currency: string;
  };
  statementDate: string;
  id: string;
  type: string;
  minimum: {
    amount: number;
    currency: string;
  };
  startDate: string;
  status: string;
  hasPaymentInProcess: boolean;
}

export interface PaymentsOrderComponentProps {
  getReqOrdersSuccess: PaymentOrder[];
  isLoading: boolean;
  getReqOrdersError: any;
}

export interface AccountStatusProps {
  account: {
    balance: {
      getReqBalanceSuccess?: {
        consumed: {
          PEN: {
            amount: number;
            currency: string;
          };
          USD: {
            amount: number;
            currency: string;
          };
        };
        available: {
          PEN: {
            amount: number;
            currency: string;
          };
          USD: {
            amount: number;
            currency: string;
          };
        };
        creditLimit: {
          PEN: {
            amount: number;
            currency: string;
          };
          USD: {
            amount: number;
            currency: string;
          };
        };
        isDelinquent?: boolean;
      };
      isLoading: boolean;
      getReqBalanceError: Error | string | null;
      showBalance: boolean;
    };
    orders: PaymentsOrderComponentProps;
    payment: any;
  };
}

export interface BalanceComponentProps {
  availableBalance: number | string;
  currentConsumption: number | string;
  loading: boolean;
}

export enum paymentOrdersStatus {
  ORDER_PAID = 'paid',
  ORDER_PENDING = 'pending',
}

export enum paymentOrdersTypes {
  ORDER_OPEN = 'open',
  ORDER_CLOSE = 'closed',
}
