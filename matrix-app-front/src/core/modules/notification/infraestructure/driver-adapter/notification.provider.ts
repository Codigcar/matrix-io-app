import AwsAmplifyImplementation from 'src/core/libraries-implementation/aws-amplify/aws-amplify.implementation';
import { Observable } from '@reduxjs/toolkit';
import { INotificationRepository } from 'src/core/modules/notification/repository/notification.repository';
import { GetNotificationsDto } from '../../dtos/get-notifications/get-all-notifications.dto';
import IGetAllNotificationsRequest from '../../dtos/get-notifications/get-all-notifications-request.interface';
import { NotificationCounterDto } from '../../dtos/get-notification-counter/get-notifications-counter.dto';
import { ReadNotificationsDto } from '../../dtos/read-notifications/read-notifications.dto';
import { RemoveNotificationsDto } from '../../dtos/remove-notification/remove-notification.dto';
import { ResetNotificationMutationDto } from '../../dtos/reset-notification-mutation/reset-notification-mutation.dto';
import { IOncreateNotification } from '../../dtos/oncreate-notification/oncreate-notification';

class NotificationProvider implements INotificationRepository {
  private graphqlImpl: AwsAmplifyImplementation;

  constructor() {
    this.graphqlImpl = new AwsAmplifyImplementation();
  }

  public onCreateNotification(data: object): Observable<IOncreateNotification> {
    const query = `subscription SubscriptionListarNotificaciones {
      onCreateNotification {
        id
        title
        description
        isRead
        createdAt
        user
      }
    }`;

    return this.graphqlImpl.graphqlQuery(query, data) as Observable<IOncreateNotification>;
  }

  public getAllNotification(nextToken: IGetAllNotificationsRequest): Promise<GetNotificationsDto> {
    const query = () => `query ListarNotificaciones {
      listNotifications (nextToken: "${nextToken}", limit: 7){
        nextToken
        items {
          id
          title
          description
          isRead
          createdAt
          user
        }
      }
    }`;
    return this.graphqlImpl.graphqlQuery(query) as Promise<GetNotificationsDto>;
  }

  public readNotification(id: number): Promise<ReadNotificationsDto> {
    const query = () => `mutation MarcaComoLeido($id: ID = "${id}", $isRead: Boolean = true) {
      updateNotification(command: {id: $id, isRead:  $isRead}) {
        id
        title
        description
        isRead
        createdAt
        user
      }
    }`;

    return this.graphqlImpl.graphqlQuery(query) as Promise<ReadNotificationsDto>;
  }

  public removeNotification(id: string): Promise<RemoveNotificationsDto> {
    const query = () => `mutation EliminarNotificacion($id: ID = "${id}") {
      deleteNotification(id: $id) {
        id
        title
        description
        isRead
        createdAt
        user
      }
    }`;

    return this.graphqlImpl.graphqlQuery(query) as Promise<RemoveNotificationsDto>;
  }

  public getNotificationCounter(): Promise<NotificationCounterDto> {
    const query = `query getNotificationCounter {
      getNewNotificationsCounter
    }`;

    return this.graphqlImpl.graphqlQuery(query) as Promise<NotificationCounterDto>;
  }
  //temporal method
  public notificationCounterSubscription(): Observable<any> {
    const query = `subscription onUpdateNotificationCounter{
      onUpdateNewNotificationsCounter {
        time
        user
        value
      }
    }`;

    return this.graphqlImpl.graphqlQuery(query) as Observable<any>;
  }

  public resetNewNotificationsMutation(): Promise<ResetNotificationMutationDto> {
    const query = `mutation resetNewNotificationsCounter{
      resetNewNotificationsCounter {
        time
        user
        value
      }
    }`;

    return this.graphqlImpl.graphqlQuery(query) as Promise<ResetNotificationMutationDto>;
  }
}

export default NotificationProvider;
