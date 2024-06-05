import ResetNotificationMutationUseCase from './reset-notification-mutation.use-case';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';

jest.mock('src/core/modules/notification/repository/notification.repository');

describe('ResetNotificationMutationUseCase', () => {
  let resetNotificationMutationUseCase: ResetNotificationMutationUseCase;
  let mockRepository: jest.Mocked<INotificationRepository>;

  beforeEach(() => {
    mockRepository = {
      resetNewNotificationsMutation: jest.fn(),
    } as any;
    resetNotificationMutationUseCase = new ResetNotificationMutationUseCase(mockRepository);
  });

  it('should reset new notifications counter', async () => {
    
    const mockResponse = {
      data: {
        resetNewNotificationsCounter: {
          time: '2023-01-01T12:00:00Z',
          user: 'user123',
          value: 0,
        },
      },
    };

    mockRepository.resetNewNotificationsMutation.mockResolvedValueOnce(mockResponse);
    const result = await resetNotificationMutationUseCase.execute();
    expect(mockRepository.resetNewNotificationsMutation).toHaveBeenCalledWith();
    expect(result).toEqual(mockResponse.data.resetNewNotificationsCounter);
  });

});
