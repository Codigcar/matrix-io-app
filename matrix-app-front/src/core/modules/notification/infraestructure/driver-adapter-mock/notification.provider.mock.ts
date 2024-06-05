/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from '@reduxjs/toolkit';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { GetNotificationsDto } from '../../dtos/get-notifications/get-all-notifications.dto';
import IGetAllNotificationsRequest from '../../dtos/get-notifications/get-all-notifications-request.interface';
import { ReadNotificationsDto } from '../../dtos/read-notifications/read-notifications.dto';
import { RemoveNotificationsDto } from '../../dtos/remove-notification/remove-notification.dto';
import { NotificationCounterDto } from '../../dtos/get-notification-counter/get-notifications-counter.dto';
import { ResetNotificationMutationDto } from '../../dtos/reset-notification-mutation/reset-notification-mutation.dto';

const readNotificationMock = (id: number) => ({
  data:{
    updateNotification: {
      id: '345666',
      createdAt: '2023-11-15T17:07:12.407Z',
      description: '¡Pago exitoso! Pagaste el monto de S/3 con una tarjeta de débito.',
      isRead: true,
      title: '',
      user: '2d0cb386-5fd8-4c46-b764-1a6d8844ad18',
    }
  }
});

const removeNotificationMock = (id: string) => ({
  data:{
    deleteNotification: {
      id: id ?? 'cccede79-82f9-4c7b-af7c-51fbc',
      createdAt: '2023-11-15T17:07:12.407Z',
      description: '¡Pago exitoso! Pagaste el monto de S/3 con una tarjeta de débito.',
      isRead: true,
      title: '',
      user: '2d0cb386-5fd8-4c46-b764-1a6d8844ad18',
    }
  }
});

const resetMutationResult = {
  data: {
    resetNewNotificationsCounter: {
      time: '2023-12-31T23:59:59.999Z',
      user: '2d0cb386-5fd8-4c46-b764-1a6d8844ad18',
      value: 0,
    }
  }
};

const allNotificationMock = (nextToken: IGetAllNotificationsRequest): GetNotificationsDto => ({
  data: {
    listNotifications: {
      nextToken: nextToken ? 'b89j-oVzuRwhkuFDpKfq6YRlQz3G8nLm6/P8ymMzRwSjpLC6q5x' : null,
      items: [{
        id: 'fafa33a1-a0a3-43bc-b186-bdd41343bd44',
        createdAt: '2023-11-15T17:07:12.407Z',
        description: '¡Pago exitoso! Pagaste el monto de S/3 con una tarjeta de débito.',
        isRead: true,
        title: '',
        user: '2d0cb386-5fd8-4c46-b764-1a6d8844ad18'
      }],
    },
  },
});

class NotificationProviderMock implements INotificationRepository {
  getAllNotification(nextToken: IGetAllNotificationsRequest): Promise<GetNotificationsDto> {
    return Promise.resolve(allNotificationMock(nextToken));
  }

  readNotification(id: number): Promise<ReadNotificationsDto> {
    return Promise.resolve(readNotificationMock(id));
  }

  removeNotification(id: string): Promise<RemoveNotificationsDto> {
    return Promise.resolve(removeNotificationMock(id));
  }

  getNotificationCounter(): Promise<NotificationCounterDto> {
    const notificationCounter = {
      data: {
        getNewNotificationsCounter: 5,
      }
    };
    return Promise.resolve(notificationCounter);
  }

  resetNewNotificationsMutation(): Promise<ResetNotificationMutationDto> {
    return Promise.resolve(resetMutationResult);
  }

  onCreateNotification(variables: object): Observable<any> {
    throw new Error('Method not implemented.');
  }

}

export default NotificationProviderMock;
