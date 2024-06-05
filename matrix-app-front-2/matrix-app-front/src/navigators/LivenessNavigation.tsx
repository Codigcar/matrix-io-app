import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationScreenNames from 'src/utils/navigationScreenNames';
// Screens
import FaceScan from 'src/screens/KYC/Liveness/FaceScan/FaceScan';
import LivenessLoading from 'src/screens/KYC/Liveness/Loading/LivenessLoading';
import GoToGetPersonalData from 'src/screens/KYC/Liveness/GoToGetPersonalData/GoToGetPersonalData';
import ManualCheck from 'src/screens/KYC/ManualCheck/ManualCheck';
import LivenessIntro from 'src/screens/KYC/Liveness/Intro/LivenessIntro';
import { onboarding } from 'src/utils/constants';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const LivenessNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.livenessIntro}
  >
    <Stack.Screen
      name={navigationScreenNames.livenessIntro}
      component={LivenessIntro}
      initialParams={{
        signedUrl: null,
        instructions: null,
        process: onboarding,
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.livenessFaceScan}
      component={FaceScan}
      initialParams={{
        process: onboarding,
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.livenessLoading}
      component={LivenessLoading}
      initialParams={{
        stack: 'Enrollment',
        process: onboarding,
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.livenessGoToGetPersonalData}
      component={GoToGetPersonalData}
      initialParams={{
        isOk: false,
        process: onboarding,
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.manualCheck}
      component={ManualCheck}
      initialParams={{
        stack: 'liveness',
      }}
    />
  </Stack.Navigator>
);

export default LivenessNavigation;
