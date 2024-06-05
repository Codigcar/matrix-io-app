import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListNotifications from 'src/screens/Notifications/screens/notification-list/notification-list.screen';
import NotificationDetail from 'src/screens/Notifications/screens/notification-detail/notification-detail.screen';
import { InboxRoutesEnum } from 'src/shared/enums/routes/inbox-routes.enum';
import styles from 'src/screens/Home/Main/styles/MtxHomeStyle';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const NotificationStack = () => (
  <View style={styles.container}>
    <Stack.Navigator
      screenOptions={defaultConfig}
      initialRouteName={InboxRoutesEnum.NOTIFICATION_LIST}
    >
      <Stack.Screen
        name={InboxRoutesEnum.NOTIFICATION_LIST}
        component={ListNotifications}
      />
      <Stack.Screen
        name={InboxRoutesEnum.NOTIFICATION_DETAIL}
        component={NotificationDetail}
      />
    </Stack.Navigator>
  </View>
);

export default NotificationStack;
