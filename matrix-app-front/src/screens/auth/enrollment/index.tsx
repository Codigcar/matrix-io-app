import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import GetPhoneScreen from './screens/get-phone/get-phone.screen';

export type EnrollmentStackParamList = {
  [navigationScreenNames.getPhone]: {
    email: string;
    documentNumber: string;
    password: string;
  };
  [navigationScreenNames.networkError]: undefined;
  [navigationScreenNames.verifyOTP]: {
    destination: string;
    id: string | number[];
    password: string;
  };
  [navigationScreenNames.offerUnavailable]: {
    token: string;
  };
};

const RecoverPassword = createNativeStackNavigator<EnrollmentStackParamList>();

const RecoverPasswordModule: React.FC = () => (
  <RecoverPassword.Navigator>
    <RecoverPassword.Screen
      name={navigationScreenNames.getPhone}
      component={GetPhoneScreen}
      options={{ headerShown: false }}
    />
  </RecoverPassword.Navigator>
);

export default RecoverPasswordModule;
