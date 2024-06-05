export const listNotifications = (nextToken: any) => (`query ListarNotificaciones {
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
}`);

export const markRead = (id: number) => (`mutation MarcaComoLeido($id: ID = "${id}", $isRead: Boolean = true) {
  updateNotification(command: {id: $id, isRead:  $isRead}) {
    id
    title
    description
    isRead
    createdAt
    user
  }
}`);

export const deleteNotification = (id: number) => (`mutation EliminarNotificacion($id: ID = "${id}") {
  deleteNotification(id: $id) {
    id
    title
    description
    isRead
    createdAt
    user
  }
}`);

export const onCreateNotification = `subscription SubscriptionListarNotificaciones {
  onCreateNotification {
    id
    title
    description
    isRead
    createdAt
    user
  }
}`;

export const notificationCounter = `query getNotificationCounter {
  getNewNotificationsCounter
}`;

export const notificationCounterSubscription = `subscription onUpdateNotificationCounter{
  onUpdateNewNotificationsCounter {
    time
    user
    value
  }
}`;

export const resetNewNotificationsMutation = `mutation resetNewNotificationsCounter{
  resetNewNotificationsCounter {
    time
    user
    value
  }
}`;
