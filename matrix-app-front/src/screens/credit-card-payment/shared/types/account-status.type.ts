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
    startDay: string;
    startMonth: string;
    endDay: string;
    endDayMonth: string;
    startYear: string;
    endYear: string;
  };
  navigate: () => void;
  minimumPaymentAmount: number;
  isFirstBillingCycle: boolean;
  isErrorListMovements: boolean;
  fetchListMovements: () => Promise<void>;
}

export interface MoneyTypeButtonComponentProps {
  moneyType: String;
  description: string;
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

export interface BillingCycleDateProps {
  day: string;
  month: string;
  year: string;
}

export interface PeriodDates {
  period: string;
  title: string;
  id: string;
}

export enum moneyTypes {
  SOLES = 'Soles',
  DOLARES = 'Dólares',
}

export enum paymentOrdersStatus {
  ORDER_PAID = 'paid',
  ORDER_PENDING = 'pending',
}

export enum paymentOrdersTypes {
  ORDER_OPEN = 'open',
  ORDER_CLOSE = 'closed',
}
