import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import GetAllNotificationUseCase from 'src/core/modules/notification/domain/use-cases/get-all-notifications/get-all-notifications.use-case';
import { INotificationData } from '../../../dtos/get-notifications/get-all-notifications';

jest.mock('src/core/modules/notification/repository/notification.repository');

describe('GetAllNotificationUseCase', () => {
  let getAllNotificationUseCase: GetAllNotificationUseCase;
  let mockNotificationRepository: jest.Mocked<INotificationRepository>;

  beforeEach(() => {
    mockNotificationRepository = {
      getAllNotification: jest.fn(),
    } as any;
    getAllNotificationUseCase = new GetAllNotificationUseCase(mockNotificationRepository);
  });

  test('should call repository getAllNotification and return the result from dtoToGetAllNotification', async () => {
    const mockDtoResponse: INotificationData = {
      data: {
        listNotifications: {
          nextToken: 'b89j-oVzuRwhkuFDpKfq6YRlQz3G8nLm6/P8ymMzRwSjpLC6q5x',
          items: [
            {
              createdAt: '2023-11-15T17:07:12.407Z',
              description: '¡Pago exitoso! Pagaste el monto de S/3 con una tarjeta de débito.',
              id: 'fafa33a1-a0a3-43bc-b186-bdd41343bd44',
              isRead: false,
              title: '',
              user: '2d0cb386-5fd8-4c46-b764-1a6d8844ad18',
            },
          ],
        },
      },
    };

    mockNotificationRepository.getAllNotification.mockResolvedValueOnce(mockDtoResponse);

    const result = await getAllNotificationUseCase.execute(null);

    expect(mockNotificationRepository.getAllNotification).toHaveBeenCalled();
    expect(result).toEqual(mockDtoResponse);
  });
});
