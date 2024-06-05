import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { useState } from 'react';
import { NavigationType } from 'src/types/types';

import navigationScreenNames from 'src/utils/navigationScreenNames';
import { listNotifications, onCreateNotification, deleteNotification } from '../../graphql/schema';
import { NotificationType } from '../../models/notifications';

export const useListNotifications = (setList: Function, list: NotificationType[]) => {
  const navigation = useNavigation<NavigationType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string>('');

  const navigationDetail = (item: NotificationType) => {
    navigation.navigate(navigationScreenNames.notificationDetail, { item });
  };

  const fetchNotifications = async () => {
    setLoading(true);
    if (nextPage || nextPage === '') {
      const { data } = await API.graphql(graphqlOperation(listNotifications(nextPage)));
      setList([...list, ...data.listNotifications.items]);
      setNextPage(data.listNotifications.nextToken);
    }
    setLoading(false);
  };

  const removeNotification = (id: string) => {
    const arr = list.filter((item) => item.id !== id);
    setList(arr);
    const controllerForRecall = list.length < 7;
    if (controllerForRecall) {
      fetchNotifications();
    }
  };

  const deletedNotification = (id: number) => {
    API.graphql(graphqlOperation(deleteNotification(id)));
  };

  return {
    loading,
    nextPage,
    listNotifications,
    navigationDetail,
    onCreateNotification,
    deletedNotification,
    removeNotification,
    fetchNotifications,
  };
};

export default useListNotifications;
