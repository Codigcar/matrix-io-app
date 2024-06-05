import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/core/enums/services-instance.enum';
import ConstantsEnum from 'src/core/enums/constants.enum';
import AccountStatusApiEnum from 'src/core/enums/services/account-status-api.enum';
import { CreditCardDetailProvider } from './credit-card-detail.provider';

jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('CreditCardDetailProvider', () => {
  let creditCardDetailProvider: CreditCardDetailProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = new HttpImplementation() as jest.Mocked<HttpImplementation>;
    creditCardDetailProvider = new CreditCardDetailProvider(mockHttpImpl);
  });

  describe('CreditCardDetailProvider', () => {
    it('should call get with correct arguments for balance', async () => {
      const mockResponse = { balance: 1000, currency: 'USD' };
      mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

      const response = await creditCardDetailProvider.getBalance();

      expect(mockHttpImpl.get).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        AccountStatusApiEnum.BALANCE,
        ConstantsEnum.JSON,
      );
      expect(response).toEqual(mockResponse);
    });

    it('should call get with correct arguments for payment orders', async () => {
      const mockResponse = [
        { orderId: 'order1', amount: 500, status: 'pending' },
        { orderId: 'order2', amount: 1500, status: 'completed' },
      ];
      mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

      const response = await creditCardDetailProvider.getPaymentOrder();

      expect(mockHttpImpl.get).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        AccountStatusApiEnum.PAYMENT_ORDERS,
        ConstantsEnum.JSON,
      );
      expect(response).toEqual(mockResponse);
    });
  });
});
