import { Observable } from "@reduxjs/toolkit";
import IGetAllNotificationsRequest from "../dtos/get-notifications/get-all-notifications-request.interface";
import { GetNotificationsDto } from "../dtos/get-notifications/get-all-notifications.dto";
import { NotificationCounterDto } from "../dtos/get-notification-counter/get-notifications-counter.dto";
import { ReadNotificationsDto } from "../dtos/read-notifications/read-notifications.dto";
import { RemoveNotificationsDto } from "../dtos/remove-notification/remove-notification.dto";
import { ResetNotificationMutationDto } from "../dtos/reset-notification-mutation/reset-notification-mutation.dto";
import { IOncreateNotification } from "../dtos/oncreate-notification/oncreate-notification";

export interface INotificationRepository {
  getAllNotification(nextPage: IGetAllNotificationsRequest): Promise<GetNotificationsDto>;
  getNotificationCounter(): Promise<NotificationCounterDto>;
  readNotification(id: number): Promise<ReadNotificationsDto>;
  removeNotification(id: string): Promise<RemoveNotificationsDto>;
  resetNewNotificationsMutation(): Promise<ResetNotificationMutationDto>;
  onCreateNotification(data: object): Observable<IOncreateNotification>;
}
