import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import RedemptionScreen from 'src/screens/CashBack/Redemption/Redemption';
import RedemptionLoading from 'src/screens/CashBack/RedemptionLoading/RedemptionLoading';
import RedemptionError from 'src/screens/CashBack/RedemptionError/RedemptionError';
import RedemptionSuccess from 'src/screens/CashBack/RedemptionSuccess/RedemptionSuccess';
import navigationScreenNames from 'src/utils/navigationScreenNames';

// Styles
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
  gestureEnabled: false,
};

const RedemptionNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.redemption.stack}
  >
    <Stack.Screen name={navigationScreenNames.redemption.loading} component={RedemptionLoading} />
    <Stack.Screen name={navigationScreenNames.redemption.error} component={RedemptionError} />
    <Stack.Screen name={navigationScreenNames.redemption.success} component={RedemptionSuccess} />
  </Stack.Navigator>
);

export default RedemptionNavigation;
