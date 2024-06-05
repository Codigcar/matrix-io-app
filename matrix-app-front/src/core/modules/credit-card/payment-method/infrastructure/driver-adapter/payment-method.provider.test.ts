import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import TransactionApiEnum from 'src/core/enums/services/transaction-api.enum';
import ConstantsEnum from 'src/shared/enums/constants.enum';
import { PaymentMethodProvider } from './payment-method.provider';

jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('PaymentMethodProvider', () => {
  let paymentMethodProvider: PaymentMethodProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = new HttpImplementation() as jest.Mocked<HttpImplementation>;
    paymentMethodProvider = new PaymentMethodProvider(mockHttpImpl);
  });

  describe('CreditCardTransactionProvider', () => {
    it('should call setPaymentMethod with correct arguments', async () => {
      const mockData = {
        token: 'test',
      };
      const mockResponse = {
        id: 'test',
        alias: 'test',
        brand: 'test',
        provider: 'test',
        type: 'test',
      };
      mockHttpImpl.post.mockResolvedValueOnce(mockResponse);

      const response = await paymentMethodProvider.setPaymentMethod(mockData);

      expect(response).toEqual(mockResponse);
      expect(mockHttpImpl.post).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        TransactionApiEnum.PAYMENT_METHOD,
        mockData,
        ConstantsEnum.JSON,
      );
    });

    it('should call getPaymentMethod with correct arguments', async () => {
      const mockResponse = [
        {
          id: 'test',
          alias: 'test',
          brand: 'test',
          provider: 'test',
          type: 'test',
        },
      ];
      mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

      const response = await paymentMethodProvider.getPaymentMethod();

      expect(response).toEqual(mockResponse);
      expect(mockHttpImpl.get).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        TransactionApiEnum.PAYMENT_METHOD,
        ConstantsEnum.JSON,
      );
    });

    it('should call delete method with correct url', async () => {
      const paymentMethodId = '123';
      const expectedUrl = `${TransactionApiEnum.PAYMENT_METHOD}/${paymentMethodId}`;
      mockHttpImpl.delete.mockResolvedValueOnce(undefined);

      await paymentMethodProvider.deletePaymentMethod(paymentMethodId);

      expect(mockHttpImpl.delete).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        expectedUrl,
      );
    });
  });
});
