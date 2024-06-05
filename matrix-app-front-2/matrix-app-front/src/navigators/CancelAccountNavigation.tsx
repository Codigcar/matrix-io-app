import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CancelAccountBenefits from 'src/screens/CancelAccount/CancelAccountBenefits';
import CancelAccountSurvey from 'src/screens/CancelAccount/CancelAccountSurvey/CancelAccountSurvey';
import CancelAccountComplete from 'src/screens/CancelAccount/CancelAccountComplete/CancelAccountComplete';
import CancelAccountWaiting from 'src/screens/CancelAccount/CancelAccountWaiting/CancelAccountWaiting';
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const CancelAccountNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName="CancelAccountBenefits"
  >
    <Stack.Screen
      name="CancelAccountBenefits"
      component={CancelAccountBenefits}
    />
    <Stack.Screen
      name="CancelAccountSurvey"
      component={CancelAccountSurvey}
    />
    <Stack.Screen
      name="CancelAccountWaiting"
      component={CancelAccountWaiting}
      initialParams={{
        indexSelected: '',
        otherReason: ''
      }}
    />
    <Stack.Screen
      name="CancelAccountComplete"
      component={CancelAccountComplete}
      initialParams={{
        requestTime: '',
        maskedCard: '',
        requestDate: '',
        pendingPayment: '',
        pendingCreditBalance: '',
      }}
    />
  </Stack.Navigator>
);

export default CancelAccountNavigation;
