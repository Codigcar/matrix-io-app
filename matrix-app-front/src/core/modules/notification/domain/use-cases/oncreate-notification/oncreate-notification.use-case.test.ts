import OnCreateNotificationUseCase from './oncreate-notification.use-case';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';

jest.mock('src/core/modules/notification/repository/notification.repository');

describe('OnCreateNotificationUseCase', () => {
  let onCreateNotificationUseCase: OnCreateNotificationUseCase;
  let mockRepository: jest.Mocked<INotificationRepository>;

  beforeEach(() => {
    mockRepository = {
      onCreateNotification: jest.fn(),
    } as any;
    onCreateNotificationUseCase = new OnCreateNotificationUseCase(mockRepository);
  });

  it('should create a new notification', async () => {

    const variables = {};

    const mockResponse = {
      data: {
        onCreateNotification: {
          id: '1',
          title: 'Notification Title',
          description: 'Notification Description',
          isRead: false,
          createdAt: '2023-01-01T12:00:00Z',
          user: 'user123',
        },
      },
    };

    mockRepository.onCreateNotification.mockResolvedValueOnce(mockResponse);
    const result = await onCreateNotificationUseCase.execute(variables);
    expect(mockRepository.onCreateNotification).toHaveBeenCalledWith(variables);
    expect(result).toEqual(mockResponse);
  });

});
