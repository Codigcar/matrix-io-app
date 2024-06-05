import { PaymentDto, PaymentRequestDto, PaymentStatusDto } from '../dtos';

export interface IPaymentRepository {
  creditCardPayment(data: PaymentRequestDto): Promise<PaymentDto>;
  getPaymentStatus(id: string): Promise<PaymentStatusDto>;
}
