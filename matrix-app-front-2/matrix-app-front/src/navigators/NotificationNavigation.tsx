import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import ListNotifications from 'src/screens/Notifications/List/ListNotifications';
import NotificationDetail from 'src/screens/Notifications/Detail/NotificationDetail';

import styles from 'src/screens/Home/Main/styles/MtxHomeStyle';
import { View } from 'react-native';
import navigationScreenNames from 'src/utils/navigationScreenNames';

// Styles
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const NotificationNavigation = () => (
  <View style={styles.container}>
    <Stack.Navigator
      screenOptions={defaultConfig}
      initialRouteName={navigationScreenNames.notificationList}
    >
      <Stack.Screen
        name={navigationScreenNames.notificationList}
        component={ListNotifications}
      />
      <Stack.Screen
        name={navigationScreenNames.notificationDetail}
        component={NotificationDetail}
      />
    </Stack.Navigator>
  </View>
);

export default NotificationNavigation;
