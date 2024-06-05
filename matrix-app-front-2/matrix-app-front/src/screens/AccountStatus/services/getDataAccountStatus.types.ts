// BALANCE

export interface BalanceResponse {
  consumed: Consumed;
  accountId: string;
  available: Available;
  creditLimit: Available;
}

type Consumed = {
  amount: number;
  currency: string;
  details: Available[];
};

type Available = {
  amount: number;
  currency: string;
};

// PAYMENT

export interface PaymentOrderResponse {
  accountId: string;
  total: Minimum;
  endDate: string;
  dueDate: string;
  pending: Minimum;
  statementDate: string;
  id: string;
  type: string;
  minimum: Minimum;
  hasPaymentInProcess: boolean;
  startDate: string;
  status: string;
}

type Minimum = {
  amount: number;
  currency: string;
};

// ACCOUNT STATEMENTS

export interface HistoryMovementsResponse {
  id: string;
  period: string;
}

export interface MovementResponse {
  id: string;
  url: string;
}
