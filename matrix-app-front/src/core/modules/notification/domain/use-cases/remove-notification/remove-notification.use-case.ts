import { IUseCase } from 'src/core/contracts/use-case.interface';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { IRemoveNotifications } from '../../../dtos/remove-notification/remove-notification';
import dtoToRemoveNotifications from '../../mappers/remove-notification/remove-notification.deserialize';

class RemoveNotificationUseCase implements IUseCase<string,IRemoveNotifications> {
  public repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  public async execute(id: string): Promise<IRemoveNotifications> {
    const response = await this.repository.removeNotification(id);
    return dtoToRemoveNotifications(response);
  }
}

export default RemoveNotificationUseCase;
