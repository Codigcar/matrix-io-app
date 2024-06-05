/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
// Screens
import PasswordRecoveryResponse from 'src/screens/PasswordRecovery/PasswordRecoveryResponse/PasswordRecoveryResponse';
import GetDocumentScreen from 'src/screens/PasswordRecovery/GetDNI/screens/getDocument-screen';
import NewPasswordScreen from 'src/screens/PasswordRecovery/NewPassword/screens/newPassword-screen';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import SupportHomeScreen from 'src/screens/Support/SupportHome';
import VerifyOtpScreen from 'src/screens/auth/modules/recover-password/screens/verify-otp/verify-otp.screen';
// Styles
const Stack = createNativeStackNavigator();

const defaultConfig: NativeStackNavigationOptions = {
  headerShown: false,
};

const RecoveryPasswordNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.recoveryPassword.getDNI}
  >
    <Stack.Screen
      name={navigationScreenNames.recoveryPassword.getDNI}
      component={GetDocumentScreen}
    />
    <Stack.Screen
      name={navigationScreenNames.SupportHome}
      component={SupportHomeScreen}
      initialParams={{
        stack: 'forgotPassword',
        isBlocked: false,
        destination: '',
        documentNumber: '',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.recoveryPassword.verifyOTP}
      component={VerifyOtpScreen}
      initialParams={{
        stack: 'forgotPassword',
        isBlocked: false,
        destination: '',
        documentNumber: '',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.recoveryPassword.newPassword}
      component={NewPasswordScreen}
      initialParams={{
        code: '',
        documentNumber: '',
      }}
    />
    <Stack.Screen
      name={navigationScreenNames.recoveryPassword.response}
      component={PasswordRecoveryResponse}
      initialParams={{
        isOkResponse: false,
      }}
    />
  </Stack.Navigator>
);

export default RecoveryPasswordNavigation;
