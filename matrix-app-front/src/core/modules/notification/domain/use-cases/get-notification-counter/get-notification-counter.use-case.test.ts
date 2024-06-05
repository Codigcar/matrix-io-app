import GetNotificationCounterUseCase from './get-notification-counter.user-case';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';

jest.mock('src/core/modules/notification/repository/notification.repository');

describe('GetNotificationCounterUseCase', () => {
  let getNotificationCounterUseCase: GetNotificationCounterUseCase;
  let mockRepository: jest.Mocked<INotificationRepository>;

  beforeEach(() => {
    mockRepository = {
      getNotificationCounter: jest.fn(),
    } as any;
    getNotificationCounterUseCase = new GetNotificationCounterUseCase(mockRepository);
  });

  it('should return notifications counter', async () => {
    const mockResponse = {
      data: {
        getNewNotificationsCounter: 5,
      }
    };
    mockRepository.getNotificationCounter.mockResolvedValueOnce(mockResponse);
    const result = await getNotificationCounterUseCase.execute();
    expect(mockRepository.getNotificationCounter).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

});
