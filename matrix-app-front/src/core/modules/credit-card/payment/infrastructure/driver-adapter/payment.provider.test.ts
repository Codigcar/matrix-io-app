import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import TransactionApiEnum from 'src/core/enums/services/transaction-api.enum';
import ConstantsEnum from 'src/shared/enums/constants.enum';
import { PaymentProvider } from './payment.provider';

jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('PaymentProvider', () => {
  let paymentProvider: PaymentProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = new HttpImplementation() as jest.Mocked<HttpImplementation>;
    paymentProvider = new PaymentProvider(mockHttpImpl);
  });

  describe('PaymentProvider', () => {
    it('should call creditCardPayment with correct arguments', async () => {
      const requestData = {
        method: 'test',
        amount: 500,
        currency: 'test',
        account: 'test',
      };
      const mockResponse = {
        id: 'test',
        createAt: 'test',
        amount: 'test',
      };
      mockHttpImpl.post.mockResolvedValueOnce(mockResponse);

      const response = await paymentProvider.creditCardPayment(requestData);

      expect(mockHttpImpl.post).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        TransactionApiEnum.PAYMENTS,
        requestData,
        ConstantsEnum.JSON,
      );
      expect(response).toEqual(mockResponse);
    });

    it('should call getPaymentStatus with correct url', async () => {
      const paymentId = '123';
      const expectedUrl = `${TransactionApiEnum.PAYMENTS}/${paymentId}`;
      const mockResponse = {
        id: 'some-unique-id',
        account: 'user-account-id',
        chargeOperation: 'charge-operation-type',
        amount: 100.0,
        currency: 'USD',
        method: 'credit-card',
        token: 'some-token-value',
        pendingAmount: 50.0,
        status: 'COMPLETED',
        updatedAt: new Date().toISOString(),
        createAt: new Date().toISOString(),
        user: 'user-id',
        error: {
          code: null,
        },
      };
      mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

      const response = await paymentProvider.getPaymentStatus(paymentId);

      expect(mockHttpImpl.get).toHaveBeenCalledWith(ServicesInstanceEnum.API_INSTANCE, expectedUrl);
      expect(response).toEqual(mockResponse);
    });
  });
});
