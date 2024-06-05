/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import MtxAlias from 'src/screens/Profile/ChangeAlias/MtxAlias';
import VerifyOTPScreen from 'src/screens/PasswordRecovery/VerifyOTP/screens/verifyOtp-screen';
import NewAddress from 'src/screens/Profile/ChangeAddress/NewAddress';
// Email
import MtxVerifyEmail from 'src/screens/Profile/ChangeEmail/VerifyEmail/MtxVerifyEmail';
// Phone
import NewPhone from 'src/screens/Profile/ChangePhone/NewPhone/NewPhone';
import MtxVerifyPhone from 'src/screens/Profile/ChangePhone/VerifyPhone/MtxVerifyPhone';
import GenericError from 'src/components/GenericError/GenericError';
import styles from 'src/screens/Home/Main/styles/MtxHomeStyle';
import { View } from 'react-native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import MyProfile from 'src/screens/Profile/MyProfile/MyProfile';
import NewEmail from 'src/screens/Profile/ChangeEmail/NewEmail/NewEmail';
import NotAvailable from 'src/screens/Profile/NotAvailable/NotAvailable';
import ReferralCode from 'src/screens/Profile/ReferralCode/referral-code.screen';
import RoutesEnum from 'src/shared/enums/routes/routes.enum';

// Styles
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmailStack = () => (
  <Stack.Navigator screenOptions={defaultConfig} initialRouteName="NewEmail">
    <Stack.Screen
      name="VerifyEmail"
      component={MtxVerifyEmail}
      initialParams={{ emailMask: 'a**@***.com' }}
    />
    <Stack.Screen name="NewEmail" component={NewEmail} />
    <Stack.Screen
      name="VerifyOTP"
      component={VerifyOTPScreen}
      initialParams={{ stack: 'email', isBlocked: false, origin: 'profile' }}
    />
    <Stack.Screen name={navigationScreenNames.personalChangeDataNotAvailable} component={NotAvailable} />
  </Stack.Navigator>
);

const PhoneStack = () => (
  <Stack.Navigator screenOptions={defaultConfig} initialRouteName="VerifyPhone">
    <Stack.Screen name="VerifyPhone" component={MtxVerifyPhone} />
    <Stack.Screen name="NewPhone" component={NewPhone} />
    <Stack.Screen
      name="VerifyOTP"
      component={VerifyOTPScreen}
      initialParams={{ stack: 'phone', isBlocked: false }}
    />
    <Stack.Screen name={navigationScreenNames.personalChangeDataNotAvailable} component={NotAvailable} />
  </Stack.Navigator>
);

const ProfileNavigation = (props: NavigationPropsType) => (
  <View style={styles.container}>
    <Stack.Navigator screenOptions={defaultConfig} initialRouteName="MtxMyProfile">
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        initialParams={{ isChangedValue: false, message: 'message' }}
      />
      <Stack.Screen name="EmailStack" component={EmailStack} />
      <Stack.Screen name="Alias" component={MtxAlias} />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyOTPScreen}
        initialParams={{ stack: 'email', isBlocked: false, origin: 'profile' }}
      />
      <Stack.Screen name="Phone" component={PhoneStack} />
      <Stack.Screen name="Address" component={NewAddress} />
      <Stack.Screen name={navigationScreenNames.genericError} component={GenericError} />
      <Stack.Screen name={RoutesEnum.REFERRAL_CODE} component={ReferralCode} />
    </Stack.Navigator>
  </View>
);

export default ProfileNavigation;
