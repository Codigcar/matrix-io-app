import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import VerifyOtpScreen from './screens/verify-otp/verify-otp.screen';
import ValidateDniScreen from './screens/validate-dni/validate-dni.screen';
import NewPasswordScreen from './screens/new-password/new-password.screen';
import RecoverFullPasswordScreen from './screens/recover-full-password/recover-full-password.screen';

const RecoverPassword = createNativeStackNavigator<ReactNavigation.PasswordRecoveryNavigator>();

const defaultConfig = {
  headerShown: false,
};

const RecoverPasswordStack: React.FC = () => (
  <RecoverPassword.Navigator
    screenOptions={defaultConfig}
    initialRouteName={AuthRoutesEnum.VALIDATE_DNI}
  >
    <RecoverPassword.Screen name={AuthRoutesEnum.VALIDATE_DNI} component={ValidateDniScreen} />
    <RecoverPassword.Screen name={AuthRoutesEnum.VALIDATE_OTP} component={VerifyOtpScreen} />
    <RecoverPassword.Screen name={AuthRoutesEnum.NEW_PASSWORD} component={NewPasswordScreen} />
    <RecoverPassword.Screen
      name={AuthRoutesEnum.RECOVER_FULL_PASSWORD}
      component={RecoverFullPasswordScreen}
    />
  </RecoverPassword.Navigator>
);

export default RecoverPasswordStack;
