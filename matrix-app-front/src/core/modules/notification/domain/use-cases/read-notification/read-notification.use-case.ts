import { IUseCase } from 'src/core/contracts/use-case.interface';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { IReadNotifications } from '../../../dtos/read-notifications/read-notifications';
import dtoToReadNotifications from '../../mappers/read-notifications/read-notifications.deserialize';

class ReadNotificationUseCase implements IUseCase<number,IReadNotifications> {
  public repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  public async execute(id: number): Promise<IReadNotifications> {
    const response = await this.repository.readNotification(id);
    return dtoToReadNotifications(response);
  }
}

export default ReadNotificationUseCase;
