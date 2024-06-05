import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { NavigationType } from 'src/types/types';

import navigationScreenNames from 'src/utils/navigationScreenNames';
import { INotificationItem } from 'src/core/modules/notification/dtos/get-notifications/get-all-notifications';
import useListNotificationsInteractor from './notification-list.interactor';

export const useListNotifications = (setList: Function, list: INotificationItem[]) => {
  const navigation = useNavigation<NavigationType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string>('');
  const { executeGetAllNotifications, executeRemoveNotification } =
    useListNotificationsInteractor();

  const navigationDetail = (item: INotificationItem) => {
    navigation.navigate(navigationScreenNames.notificationDetail, { item });
  };

  const fetchNotifications = async () => {
    setLoading(true);
    if (nextPage || nextPage === '') {
      const { data } = await executeGetAllNotifications(nextPage);

      const existingIds = new Set(list.map((item) => item.id));
      const newItems: INotificationItem[] = data.listNotifications.items;

      const uniqueItems = newItems.reduce((acc, item) => {
        if (!existingIds.has(item.id) && !acc.some((accItem) => accItem.id === item.id)) {
          acc.push(item);
          existingIds.add(item.id);
        }
        return acc;
      }, []);

      setList([...list, ...uniqueItems]);
      setNextPage(data.listNotifications.nextToken);
    }
    setLoading(false);
  };

  const removeFromList = (id: string) => {
    const arr = list.filter((item) => item.id !== id);
    setList(arr);
    const controllerForRecall = list.length < 7;
    if (controllerForRecall) {
      fetchNotifications();
    }
  };

  const removeNotification = (id: string) => {
    removeFromList(id);
    executeRemoveNotification(id);
  };

  return {
    loading,
    nextPage,
    navigationDetail,
    removeNotification,
    removeFromList,
    fetchNotifications,
  };
};

export default useListNotifications;
