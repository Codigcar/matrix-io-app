import { PaymentMethodDto, PaymentMethodRequestDto, PaymentMethodsDto } from '../dtos';

export interface IPaymentMethodRepository {
  setPaymentMethod(data: PaymentMethodRequestDto): Promise<PaymentMethodDto>;
  getPaymentMethod(): Promise<PaymentMethodsDto>;
  deletePaymentMethod(id: string): Promise<void>;
}
