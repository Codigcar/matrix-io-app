import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReCaptchaProvider } from 'src/screens/auth/providers/recaptcha-v3/index';
import RecoverPasswordStack from 'src/screens/auth/modules/recover-password/index.router';
import { GCP_RECAPTCHA_V3_KEY_ID, GCP_RECAPTCHA_DOMAIN_NAME } from 'src/utils/constants';
import ScreenOptionsDefaultConst from 'src/shared/constants/screen-options-default.const';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';
import SignUpStack from './modules/sign-up/index.router';
import SignInScreen from './modules/sign-in/sign-in.screen';
import ReCaptchaV2Screen from './modules/challenge/challenge.screen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <ReCaptchaProvider captchaDomain={GCP_RECAPTCHA_DOMAIN_NAME} siteKey={GCP_RECAPTCHA_V3_KEY_ID}>
    <Stack.Navigator
      screenOptions={ScreenOptionsDefaultConst}
      initialRouteName={AuthRoutesEnum.SIGN_IN}
    >
      <Stack.Screen name={AuthRoutesEnum.SIGN_IN} component={SignInScreen} />
      <Stack.Screen
        name={AuthRoutesEnum.PASSWORD_RECOVERY_STACK}
        component={RecoverPasswordStack}
      />
      <Stack.Screen name={AuthRoutesEnum.SIGN_UP_STACK} component={SignUpStack} />
      <Stack.Screen name={AuthRoutesEnum.CHALLENGE} component={ReCaptchaV2Screen} />
    </Stack.Navigator>
  </ReCaptchaProvider>
);

export default AuthStack;
