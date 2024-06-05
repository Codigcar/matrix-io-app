import { IAccountStatusRepository } from '../../../repository/account-status.repository';
import { GetHistoryMovementsByAccountIdUseCase } from './get-history-movements-by-account-id.use-case';
import { IHistoryMovements } from '../../../dtos';
import { dtoToHistoryMovements } from '../../mappers';

jest.mock('../../../repository/account-status.repository');

describe('GetHistoryMovementsByAccountIdUseCase', () => {
  let getHistoryMovementsByAccountIdUseCase: GetHistoryMovementsByAccountIdUseCase;
  let mockAccountStatusRepository: jest.Mocked<IAccountStatusRepository>;

  beforeEach(() => {
    mockAccountStatusRepository = {
      getHistoryMovements: jest.fn(),
    } as any;
    getHistoryMovementsByAccountIdUseCase = new GetHistoryMovementsByAccountIdUseCase(
      mockAccountStatusRepository,
    );
  });

  it('should correctly retrieve and process history movements', async () => {
    const accountId = 'test-account-id';
    const mockDtoResponse = [
      {
        id: 'test',
        period: 'test',
      },
      {
        id: 'test',
        period: 'test',
      },
    ];
    const mockHistoryMovementsDto: IHistoryMovements[] = dtoToHistoryMovements(mockDtoResponse);

    mockAccountStatusRepository.getHistoryMovements.mockResolvedValueOnce(mockHistoryMovementsDto);

    const result = await getHistoryMovementsByAccountIdUseCase.execute(accountId);

    expect(mockAccountStatusRepository.getHistoryMovements).toHaveBeenCalledWith(accountId);
    expect(result).toEqual(mockHistoryMovementsDto);
  });

  it('should handle exceptions thrown by the repository method', async () => {
    const accountId = 'test-account-id';
    mockAccountStatusRepository.getHistoryMovements.mockRejectedValueOnce(
      new Error('Error retrieving history movements'),
    );

    await expect(getHistoryMovementsByAccountIdUseCase.execute(accountId)).rejects.toThrow(
      'Error retrieving history movements',
    );
  });
});
