import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetworkLogger from 'react-native-network-logger';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: true,
};

const NetworkLoggerNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName="NetworkLogger"
  >
    <Stack.Screen
      name="NetworkLogger"
      component={NetworkLogger}
    />
  </Stack.Navigator>
);

export default NetworkLoggerNavigation;
