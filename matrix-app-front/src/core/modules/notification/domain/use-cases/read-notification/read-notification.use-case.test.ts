import { ReadNotificationsDto } from '../../../dtos/read-notifications/read-notifications.dto';
import ReadNotificationUseCase from './read-notification.use-case';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';

jest.mock('src/core/modules/notification/repository/notification.repository');

describe('ReadNotificationUseCase', () => {
  let readNotificationUseCase: ReadNotificationUseCase;
  let mockRepository: jest.Mocked<INotificationRepository>;

  beforeEach(() => {
    mockRepository = {
      readNotification: jest.fn(),
    } as any;
    readNotificationUseCase = new ReadNotificationUseCase(mockRepository);
  });

  it('should mark a notification as read', async () => {
    
    const notificationId = 1;
    const mockResponse: ReadNotificationsDto = {
      data: {
        updateNotification: {
          id: '1',
          title: 'Notification Title',
          description: 'Notification Description',
          isRead: true,
          createdAt: '2023-01-01T12:00:00Z',
          user: 'user123',
        },
      },
    };

    mockRepository.readNotification.mockResolvedValueOnce(mockResponse);
    const result = await readNotificationUseCase.execute(notificationId);
    expect(mockRepository.readNotification).toHaveBeenCalledWith(notificationId);
    expect(result).toEqual(mockResponse.data.updateNotification);
  });

});
