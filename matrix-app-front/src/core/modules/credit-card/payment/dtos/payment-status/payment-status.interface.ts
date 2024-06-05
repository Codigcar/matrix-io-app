export interface IPaymentStatus {
  amount?: number;
  pendingAmount?: number;
  status?: 'FAILED' | 'COMPLETED' | 'APPROVED' | 'DECLINED';
  createAt?: Date;
  updatedAt?: Date;
  id?: string;
  account?: string;
  currency?: string;
  method?: string;
  user?: string;
  chargeOperation?: string;
  error?: {
    code?: string;
  };
}
