import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import ServicesInstanceEnum from 'src/core/enums/services-instance.enum';
import AccountStatusApiEnum from 'src/core/enums/services/account-status-api.enum';
import ConstantsEnum from 'src/core/enums/constants.enum';
import { AccountStatusProvider } from './account-status.provider';
import { AccountStatementsDto, HistoryMovementsDto } from '../../dtos';

jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('AccountStatusProvider', () => {
  let accountStatusProvider: AccountStatusProvider;
  let mockHttpImpl: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImpl = new HttpImplementation() as jest.Mocked<HttpImplementation>;
    accountStatusProvider = new AccountStatusProvider(mockHttpImpl);
  });

  describe('getHistoryMovements', () => {
    it('should call get with correct arguments for account statements', async () => {
      const request = {
        dateId: 'some-date-id',
        isEncrypted: true,
      };
      const mockResponse: AccountStatementsDto = {
        id: '1',
        url: '2',
      };
      const url = `${AccountStatusApiEnum.ACCOUNT_STATEMENTS}/${request.dateId}/download?encrypt=${request.isEncrypted}`;
      mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

      const response = await accountStatusProvider.getAccountStatementByDateId(request);

      expect(mockHttpImpl.get).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        url,
        ConstantsEnum.JSON,
      );
      expect(response).toEqual(mockResponse);
    });
    it('should call get with correct arguments for history movements', async () => {
      const accountId = 'account123';
      const mockResponse: HistoryMovementsDto[] = [
        {
          id: 'test',
          period: 'test',
        },
      ];
      const url = `${AccountStatusApiEnum.ACCOUNT_STATEMENTS}?accountId=${accountId}`;
      mockHttpImpl.get.mockResolvedValueOnce(mockResponse);

      const response = await accountStatusProvider.getHistoryMovements(accountId);

      expect(mockHttpImpl.get).toHaveBeenCalledWith(
        ServicesInstanceEnum.API_INSTANCE,
        url,
        ConstantsEnum.JSON,
      );
      expect(response).toEqual(mockResponse);
    });
  });
});
