import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserFormScreen from 'src/screens/RequestCard/RequestOrder/screens/UserForm';
import SummaryScreen from 'src/screens/RequestCard/RequestOrder/screens/Summary';
import ActivateCardResponseScreen from 'src/screens/RequestCard/ActivateCard/screens/ActivateResponse';
import GenericError from 'src/components/GenericError/GenericError';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import ActivatePhysicalCard from 'src/screens/RequestCard/ActivateCard/screens/ActivatePhysicalCard';
import ScheduleScreen from 'src/screens/RequestCard/RequestOrder/screens/Schedule';
import ChangePinResponse from 'src/screens/RequestCard/ChangePin/screens/ChangePinResponse';
import ChangePinError from 'src/screens/RequestCard/ChangePin/screens/ChangePinError';
import IntroductionRequestScreen from 'src/screens/RequestCard/RequestOrder/screens/IntroductionRequest';
import LocationFormScreen from 'src/screens/RequestCard/RequestOrder/screens/LocationForm';
import DateUnavailableErrorScreen from 'src/screens/RequestCard/RequestOrder/screens/DateUnavailableError';
import ProcessErrorScreen from 'src/screens/RequestCard/RequestOrder/screens/ProcessError';
import { LocationProvider } from 'src/store/states/locationContext';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

export const RequestCardStack = () => (
  <LocationProvider>
    <Stack.Navigator
      screenOptions={defaultConfig}
      initialRouteName={navigationScreenNames.physicalCard.location}
    >
      <Stack.Screen
        name={navigationScreenNames.physicalCard.location}
        component={LocationFormScreen}
        initialParams={{
          onboarding: false,
        }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.schedule}
        component={ScheduleScreen}
        initialParams={{
          isEditing: false,
          contact: {},
          address: {},
          inningAvailable: {},
          dateAvailable: null,
          calendarDaysList: [],
          lastAddress: {},
          lastInning: {},
          onboarding: false,
        }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.form}
        component={UserFormScreen}
        initialParams={{
          contact: {},
          address: {},
          date: '',
          inning: {},
          calendarDaysList: [],
          onboarding: false,
        }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.dateUnavailable}
        component={DateUnavailableErrorScreen}
        initialParams={{
          isEditing: false,
          contact: {},
          address: {},
          onboarding: false,
        }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.processError}
        component={ProcessErrorScreen}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.summary}
        component={SummaryScreen}
        initialParams={{
          date: '',
          inning: '',
          phone: '',
          address: '',
          name: '',
          onboarding: false,
        }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.activation}
        component={ActivatePhysicalCard}
        initialParams={{ orderId: '' }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.response}
        component={ActivateCardResponseScreen}
      />
      <Stack.Screen
        name={navigationScreenNames.genericError}
        component={GenericError}
        initialParams={{ logout: null }}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.changePinResponse}
        component={ChangePinResponse}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.changePinError}
        component={ChangePinError}
      />
      <Stack.Screen
        name={navigationScreenNames.physicalCard.introductionRequest}
        component={IntroductionRequestScreen}
      />
    </Stack.Navigator>
  </LocationProvider>
);

export default RequestCardStack;
