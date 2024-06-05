import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Container, SafeAreaBox } from 'src/matrix-ui-components';
import { showToast, ToastType } from 'src/matrix-ui-components/components/toast';
import { spacing } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { API, graphqlOperation } from 'aws-amplify';
import { signInUserNameCognitoSelector } from 'src/utils/auth/selector/authSelector';

import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import LoadingAnimation from 'assets/lottie/LoadingAnimationGray.json';
import LottieView from 'lottie-react-native';
import CardNotification from './components/CardNotification';
import HasNoNotifications from './components/HasNoNotifications';
import { useListNotifications } from './hooks/useListNotifications';
import { useResetNotificationCounter } from '../Detail/hooks/useResetNotificationCounter';
import { NotificationType } from '../models/notifications';
import ListNotificationsSkeleton from './components/ListNotificationsSkeleton';

const MemoizedCardNotification = React.memo(CardNotification);

const ListNotifications = (props: NavigationPropsType) => {
  const { navigation } = props;

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const row: (Swipeable | null)[] = [];
  let prevOpenedRow: Swipeable | null;
  const userName = useSelector(signInUserNameCognitoSelector);
  const {
    loading,
    nextPage,
    onCreateNotification,
    deletedNotification,
    removeNotification,
    fetchNotifications,
    navigationDetail,
  } = useListNotifications(setNotifications, notifications);

  useResetNotificationCounter();
  useEffect(() => {
    fetchNotifications();
  }, []);

  useFocusEffect(() => {
    prevOpenedRow?.close();
  });

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateNotification, {
        filter: {
          type: { user: userName },
        },
      }),
    ).subscribe({
      next: ({ value }: any) => {
        setNotifications((prevNotifications) => [
          value.data.onCreateNotification,
          ...prevNotifications,
        ]);
      },
      error: () => {},
    });
    return () => subscription.unsubscribe();
  }, []);

  const handlePress = useCallback(
    (currentItem: NotificationType) => {
      const newNotifications = notifications.map((item) => {
        if (item.id === currentItem.id) {
          return { ...item, isRead: true };
        }
        return item;
      });

      setNotifications(newNotifications);
      navigationDetail(currentItem);
    },
    [notifications],
  );

  const closeRow = useCallback(
    (index: number) => {
      const newRow = row[index];
      if (prevOpenedRow && prevOpenedRow !== newRow) {
        prevOpenedRow.close();
      }
      prevOpenedRow = newRow;
    },
    [row],
  );

  const renderFooter = () => {
    if (notifications.length > 0 && nextPage != null) {
      return (
        <Box alignItems="center" justifyContent="center" mt="spacing-s">
          <Box height={32} width={32}>
            <LottieView source={LoadingAnimation} autoPlay loop />
          </Box>
        </Box>
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <Box flex={1}>
          <ListNotificationsSkeleton isVisible />
        </Box>
      );
    }
    if (!loading && notifications?.length === 0) {
      return <HasNoNotifications />;
    }
    return null;
  };

  const renderList = () => (
    <FlatList
      onScrollBeginDrag={() => prevOpenedRow?.close()}
      keyExtractor={(item) => `${item.id}`}
      data={notifications}
      contentContainerStyle={{ paddingVertical: spacing['spacing-s'] }}
      testID="list-notifications"
      renderItem={({ item, index }) => (
        <Box mt={index !== 0 ? 'spacing-s' : 'spacing-none'} pr="spacing-m">
          <MemoizedCardNotification
            testID="card-notification"
            key={item.id}
            innerRef={(ref) => {
              row[index] = ref;
            }}
            date={item.createdAt}
            title={item.description}
            isRead={item.isRead}
            onPress={() => handlePress(item)}
            onSwipeableOpen={() => closeRow(index)}
            onRemovePress={() => {
              deletedNotification(Number(item.id));
              removeNotification(item.id);
              showToast({
                type: ToastType.TypeInfo,
                title: i18n.t('notification.notificationsMessageDeleted'),
              });
            }}
            containerStyle={{ paddingLeft: spacing['spacing-m'] }}
          />
        </Box>
      )}
      onEndReachedThreshold={0}
      onEndReached={fetchNotifications}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
    />
  );

  return (
    <BackgroundWrapper>
      <Container
        imageBackground="none"
        hasGradient={false}
        isHeaderVisible
        goBackNavigate={() => navigation.goBack()}
        headerTitle={i18n.t('notification.title')}
      >
        <SafeAreaBox flex={1}>{renderList()}</SafeAreaBox>
      </Container>
    </BackgroundWrapper>
  );
};

export default ListNotifications;
