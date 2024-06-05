import { IUseCase } from 'src/core/contracts/use-case.interface';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { INotificationData } from '../../../dtos/get-notifications/get-all-notifications';
import dtoToGetNotifications from '../../mappers/get-all-notifications/get-all-notifications.deserialize';
import IGetAllNotificationsRequest from '../../../dtos/get-notifications/get-all-notifications-request.interface';

class GetAllNotificationUseCase implements IUseCase<IGetAllNotificationsRequest, INotificationData> {
  public repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  public async execute(nextPage: IGetAllNotificationsRequest): Promise<INotificationData> {
    const response = await this.repository.getAllNotification(nextPage);
    return dtoToGetNotifications(response);
  }
}

export default GetAllNotificationUseCase;
