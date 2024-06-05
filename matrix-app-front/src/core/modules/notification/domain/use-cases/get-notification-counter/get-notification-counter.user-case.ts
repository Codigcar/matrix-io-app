import { IUseCase } from 'src/core/contracts/use-case.interface';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { INotificationCounter } from '../../../dtos/get-notification-counter/get-notifications-counter';
import dtoToNotificationCounter from '../../mappers/get-notification-counter/get-notification-counter.deserialize';

class GetNotificationCounterUseCase implements IUseCase<void, INotificationCounter> {
  public repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<INotificationCounter> {
    const response = await this.repository.getNotificationCounter();
    return dtoToNotificationCounter(response);
  }
}

export default GetNotificationCounterUseCase;
