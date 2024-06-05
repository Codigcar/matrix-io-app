export interface BalanceComponentProps {
  availableBalance: number | string;
  currentConsumption: number | string;
  loading: boolean;
}
export interface BillingCycleComponentProps {
  startDate?: string;
  endDate: string;
  paymentDate?: string;
  duePaymentDate: string;
  month: string;
  billingCycleStarted: boolean;
  hasPendingPaymentOrders: boolean;
  loading: boolean;
  splitDate: {
    startDay: string,
    startMonth: string,
    endDay: string,
    endDayMonth: string,
    startYear: string,
    endYear: string,
  },
  navigate: () => void,
  minimumPaymentAmount: number,
  isFirstBillingCycle: boolean,
  isErrorListMovements: boolean,
  fetchListMovements: () => Promise<void>,
}
export interface PaymentOrder {
    accountId: string;
    total: {
        amount: number,
        currency: string
    },
    endDate: string,
    dueDate: string,
    pending: {
        amount: number,
        currency: string
    },
    statementDate: string,
    id: string,
    type: string,
    minimum: {
        amount: number,
        currency: string
    },
    startDate: string,
    status: string,
    hasPaymentInProcess: boolean;
  }

export interface PaymentsOrderComponentProps {
  getReqOrdersSuccess: PaymentOrder[];
  isLoading: boolean;
  getReqOrdersError: any;
}

export interface MoneyTypeButtonComponentProps {
  moneyType: String;
  description: String;
  selected: boolean;
  onPress: () => void;
  loading: boolean;
  lastDayPaymentDate?: string;
  startBillingCycleDate?: string;
  closingBillingCycleDate?: string;
  pendingPaymentAmount: number;
  minimumPaymentAmount: number;
  currentConsumptionAmount: number;
  disabled?: boolean;
  paymentInProgress?: boolean;
  testID?: string;
  hasPendingPaymentOrders: boolean;
  isBillingCycleStarted: boolean;
}
export interface ProgressBarComponentProps {
  percent: number;
}
export interface BillingCycleDateProps {
  day: string,
  month: string,
  year: string,
}

export interface PeriodDates {
  period: string;
  title: string;
  id: string;
}

export enum moneyTypes {
  SOLES = 'Soles',
  DOLARES = 'Dólares'
}

export enum paymentOrdersStatus {
  ORDER_PAID = 'paid',
  ORDER_PENDING = 'pending'
}

export enum paymentOrdersTypes {
  ORDER_OPEN = 'open',
  ORDER_CLOSE = 'closed',
}

export interface AccountStatusProps {
  account:{
    balance: {
      getReqBalanceSuccess?: {
        consumed: {
          amount: number;
          details: {
            amount: number;
          }[]
        };
        available: {
          amount: number;
        };
        creditLimit: {
          amount: number
        };
        isDelinquent: boolean;
      }[],
      isLoading: boolean;
      getReqBalanceError: Error | string | null;
    };
    orders: PaymentsOrderComponentProps;
    payment: any;
  }
}

export interface AccountStatementByDateIdProps {
  dateId: string;
  isEncrypted: boolean;
}