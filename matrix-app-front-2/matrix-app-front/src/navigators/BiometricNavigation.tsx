/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ResponseOkScreen from 'src/screens/Biometric/Response/ResponseOk';
import ResponseFailScreen from 'src/screens/Biometric/Response/ResponseFail';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const disableSwipeBack = {
  gestureEnabled: false,
};

const BiometricNavigation = () => (
  <Stack.Navigator screenOptions={defaultConfig} initialRouteName="ResponseOk">
    <Stack.Screen
      name="ResponseOk"
      component={ResponseOkScreen}
      options={disableSwipeBack}
      initialParams={{ type: 'face' }}
    />
    <Stack.Screen
      name="ResponseFail"
      component={ResponseFailScreen}
      options={disableSwipeBack}
      initialParams={{ type: 'face' }}
    />
  </Stack.Navigator>
);

export default BiometricNavigation;
