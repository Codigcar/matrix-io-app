type Minimum = {
  amount: number;
  currency?: string;
};

export interface IPaymentOrder {
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
