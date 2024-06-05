/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import EnrollmentWalletDone from 'src/screens/Wallet/components/EnrollmentWalletDone';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import InAppValidation from 'src/screens/Wallet/components/InApp/InAppValidation';
import CardConfigure from '../screens/CardConfigure/CardConfigureHome';
// Styles
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const SettingsNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.cardConfigure}
  >
    <Stack.Screen name={navigationScreenNames.cardConfigure} component={CardConfigure} />
    <Stack.Screen
      name={navigationScreenNames.enrollmentWalletDone}
      component={EnrollmentWalletDone}
    />
    <Stack.Screen name={navigationScreenNames.inAppValidation} component={InAppValidation} />
  </Stack.Navigator>
);

export default SettingsNavigation;
