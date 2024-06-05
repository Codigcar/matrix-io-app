import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LivenessIntro from 'src/screens/KYC/Liveness/Intro/LivenessIntro';
import LivenessLoading from 'src/screens/KYC/Liveness/Loading/LivenessLoading';
import FaceScan from 'src/screens/KYC/Liveness/FaceScan/FaceScan';
import GenericError from 'src/components/GenericError/GenericError';
import EnrollmentDeviceResponse from 'src/utils/seed/Response/EnrollmentDeviceResponse';
import GoToGetPersonalData from 'src/screens/KYC/Liveness/GoToGetPersonalData/GoToGetPersonalData';
import EnrolmentDeviceFailed from 'src/utils/seed/Response/EnrolmentDeviceFailed';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

export const EnrollmentDeviceNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.enrollmentDevice.intro}
  >
    <Stack.Screen
      name={navigationScreenNames.enrollmentDevice.intro}
      component={LivenessIntro}
      initialParams={{
        signedUrl: null,
        instructions: null,
        process: 'seed',
        validationId: '',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.enrollmentDevice.scan}
      component={FaceScan}
      initialParams={{
        process: 'seed',
        validationId: '',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.enrollmentDevice.loading}
      component={LivenessLoading}
      initialParams={{
        origin: 'auth',
        validationId: '',
        process: 'seed',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.enrollmentDevice.response}
      component={EnrollmentDeviceResponse}
    />
    <Stack.Screen
      name={navigationScreenNames.livenessGoToGetPersonalData}
      component={GoToGetPersonalData}
      initialParams={{
        isOk: true,
        process: 'userBlocked',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.genericError}
      component={GenericError}
      initialParams={{ nextScreen: '' }}
    />
    <Stack.Screen
      name={navigationScreenNames.enrollmentDevice.failed}
      component={EnrolmentDeviceFailed}
    />
  </Stack.Navigator>
);

export default EnrollmentDeviceNavigation;
