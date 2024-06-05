import { IUseCase } from 'src/core/contracts/use-case.interface';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { IOncreateNotification } from '../../../dtos/oncreate-notification/oncreate-notification';
import { Observable } from '@reduxjs/toolkit';

class OnCreateNotificationUseCase implements IUseCase<object,Observable<IOncreateNotification>> {
  public repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  public async execute(data: object): Promise<Observable<IOncreateNotification>> {
    const response = this.repository.onCreateNotification(data);
    return response;
  }
}

export default OnCreateNotificationUseCase;
