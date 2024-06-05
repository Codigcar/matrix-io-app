import { IAccountStatusRepository } from '../../../repository/account-status.repository';
import {
  IAccountStatements,
  IAccountStatementsRequest,
  AccountStatementsDto,
} from '../../../dtos';
import { accountStatementsToDto, dtoToAccountStatements } from '../../mappers';
import { GetAccountStatementsByDateUseCase } from './get-account-statements-by-date.use-case';

jest.mock('../../../repository/account-status.repository');

describe('GetAccountStatementsByDateUseCase', () => {
  let getAccountStatementsUseCase: GetAccountStatementsByDateUseCase;
  let mockAccountStatusRepository: jest.Mocked<IAccountStatusRepository>;

  beforeEach(() => {
    mockAccountStatusRepository = {
      getAccountStatementByDateId: jest.fn(),
    } as any;
    getAccountStatementsUseCase = new GetAccountStatementsByDateUseCase(
      mockAccountStatusRepository,
    );
  });

  it('should correctly retrieve and process account statements', async () => {
    const requestData: IAccountStatementsRequest = {
      dateId: '2023-01-01',
      isEncrypted: true,
    };
    const mockDtoResponse: AccountStatementsDto = {
      id: 'test',
      url: 'test',
    };
    const expectedAccountStatements: IAccountStatements = dtoToAccountStatements(mockDtoResponse);

    const requestDto = accountStatementsToDto(requestData);
    mockAccountStatusRepository.getAccountStatementByDateId.mockResolvedValueOnce(mockDtoResponse);

    const result = await getAccountStatementsUseCase.execute(requestData);

    expect(mockAccountStatusRepository.getAccountStatementByDateId).toHaveBeenCalledWith(
      requestDto,
    );
    expect(result).toEqual(expectedAccountStatements);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    const requestData: IAccountStatementsRequest = {
      dateId: '2023-01-01',
      isEncrypted: true,
    };
    mockAccountStatusRepository.getAccountStatementByDateId.mockRejectedValueOnce(
      new Error('Error retrieving account statements'),
    );

    await expect(getAccountStatementsUseCase.execute(requestData)).rejects.toThrow(
      'Error retrieving account statements',
    );
  });
});
