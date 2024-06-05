import React, { useEffect } from 'react';
import { Box, Container, Text } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { NavigationPropsType } from 'src/types/types';
import { formatDate } from 'src/utils/date-time/date-time';
import useDetailNotifications from './hooks/useDetailNotifications';

const NotificationDetail = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { item } = params;
  const { onMarkRead } = useDetailNotifications();

  useEffect(() => {
    if (!item.isRead) {
      onMarkRead(item.id);
    }
  }, []);

  return (
    <BackgroundWrapper>
      <Container
        headerTitle={i18n.t('notification.title-detail')}
        goBackNavigate={() => navigation.goBack()}
        imageBackground="none"
        hasGradient={false}
        isHeaderVisible
      >
        <Box
          mx="spacing-m"
          mt="spacing-s"
          p="spacing-m"
          borderRadius={16}
          backgroundColor="primary100"
          testID='container-detail'
        >
          <Text variant="body14Regular" color="primary700" testID='notification-description'>
            {item.description}
          </Text>
          <Text variant="body12" mt="spacing-s" color="primary700" testID='notification-date'>
            {formatDate(item.createdAt, 'DD MMM YYYY [a las] hh:mm a')}
          </Text>
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};

export default NotificationDetail;
