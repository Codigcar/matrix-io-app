import { IUseCase } from 'src/core/contracts/use-case.interface';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { IResetNotificationMutation } from '../../../dtos/reset-notification-mutation/reset-notification-mutation';
import dtoToResetNotificationMutation from '../../mappers/reset-notification-mutation/reset-notification-mutation.deserialize';

class ResetNotificationMutationUseCase implements IUseCase<void, IResetNotificationMutation> {
  public repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  public async execute(): Promise<IResetNotificationMutation> {
    const response = await this.repository.resetNewNotificationsMutation();
    return dtoToResetNotificationMutation(response);
  }
}

export default ResetNotificationMutationUseCase;
