import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyOTPScreen from 'src/screens/PasswordRecovery/VerifyOTP/screens/verifyOtp-screen';
import OfferUnavailableScreen from 'src/screens/auth/modules/sign-up/screens/offer-unavailable/offer-unavailable.screen';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import GetDniScreen from './screens/get-dni/get-dni.screen';
import GetEmailScreen from './screens/get-email/get-email.screen';
import RepeatPasswordScreen from './screens/repeat-password/repeat-password.screen';
import GetPhoneScreen from './screens/get-phone/get-phone.screen';
import NewPasswordScreen from './screens/new-password/new-password.screen';

const SignUp = createNativeStackNavigator<ReactNavigation.AuthNavigator>();

const defaultConfig = {
  headerShown: false,
};

const SignUpStack: React.FC = () => (
  <SignUp.Navigator screenOptions={defaultConfig} initialRouteName={SignUpRoutesEnum.GET_DNI}>
    <SignUp.Screen name={SignUpRoutesEnum.GET_DNI} component={GetDniScreen} />
    <SignUp.Screen name={SignUpRoutesEnum.GET_EMAIL} component={GetEmailScreen} />
    <SignUp.Screen
      name={SignUpRoutesEnum.PASSWORD_VERIFICATION}
      component={NewPasswordScreen}
    />
    <SignUp.Screen name={SignUpRoutesEnum.PASSWORD_REPEAT} component={RepeatPasswordScreen} />
    <SignUp.Screen name={SignUpRoutesEnum.GET_PHONE} component={GetPhoneScreen} />
    <SignUp.Screen
      name={SignUpRoutesEnum.OFFER_UNAVAILABLE}
      component={OfferUnavailableScreen}
    />
    <SignUp.Screen
      name={SignUpRoutesEnum.VERIFY_OTP}
      component={VerifyOTPScreen}
      initialParams={{
        stack: 'signUp',
        isBlocked: false,
        destination: '',
        destinationCustomFormat: '',
      }}
    />
  </SignUp.Navigator>
);

export default SignUpStack;
