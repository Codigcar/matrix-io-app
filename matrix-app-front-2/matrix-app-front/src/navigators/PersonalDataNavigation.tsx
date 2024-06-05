/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import GetPersonalData from 'src/screens/PersonalData/GetPersonalData/GetPersonalData';
// Constants
import navigationScreenNames from 'src/utils/navigationScreenNames';
import GetWorkData from 'src/screens/PersonalData/GetWorkData/GetWorkData';
import GetPublicWorkConfirmation from 'src/screens/PersonalData/GetPublicWorkConfirmation/GetPublicWorkConfirmation';
import PersonalDataComplete from 'src/screens/PersonalData/PersonalDataComplete/PersonalDataComplete';
// Styles
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const disableSwipeBack = {
  gestureEnabled: false,
};

const defaultParams = {
  fromLogin: false,
};

const RecoveryPasswordNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.getPersonalData}
  >
    <Stack.Screen
      name={navigationScreenNames.getPersonalData}
      component={GetPersonalData}
      initialParams={defaultParams}
      options={disableSwipeBack}
    />
    <Stack.Screen
      name={navigationScreenNames.getWorkData}
      component={GetWorkData}
      initialParams={defaultParams}
      options={disableSwipeBack}
    />
    <Stack.Screen
      name={navigationScreenNames.getPublicWorkConfirmation}
      component={GetPublicWorkConfirmation}
    />
    <Stack.Screen
      name={navigationScreenNames.personalDataComplete}
      component={PersonalDataComplete}
      options={disableSwipeBack}
    />
  </Stack.Navigator>
);

export default RecoveryPasswordNavigation;
