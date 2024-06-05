import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BenefitsHome from 'src/screens/Benefits/BenefitsHome';
import BenefitsDetails from 'src/screens/Benefits/BenefitsDetails';

import navigationScreenNames from 'src/utils/navigationScreenNames';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const BenefitsNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.benefits.details}
  >
    <Stack.Screen name={navigationScreenNames.benefits.home} component={BenefitsHome} />
    <Stack.Screen name={navigationScreenNames.benefits.details} component={BenefitsDetails} />
  </Stack.Navigator>
);

export default BenefitsNavigation;
