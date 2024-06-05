import RemoveNotificationUseCase from './remove-notification.use-case';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';

jest.mock('src/core/modules/notification/repository/notification.repository');

describe('RemoveNotificationUseCase', () => {
  let removeNotificationUseCase: RemoveNotificationUseCase;
  let mockRepository: jest.Mocked<INotificationRepository>;

  beforeEach(() => {
    mockRepository = {
      removeNotification: jest.fn(),
    } as any;
    removeNotificationUseCase = new RemoveNotificationUseCase(mockRepository);
  });

  it('should remove a notification', async () => {

    const notificationId = "1";
    const mockResponse = {
      data: {
        deleteNotification: {
          id: '1',
          title: 'Notification Title',
          description: 'Notification Description',
          isRead: false,
          createdAt: '2023-01-01T12:00:00Z',
          user: 'user123',
        },
      },
    };

    mockRepository.removeNotification.mockResolvedValueOnce(mockResponse);
    const result = await removeNotificationUseCase.execute(notificationId);
    expect(mockRepository.removeNotification).toHaveBeenCalledWith(notificationId);
    expect(result).toEqual(mockResponse.data.deleteNotification);
  });

});
