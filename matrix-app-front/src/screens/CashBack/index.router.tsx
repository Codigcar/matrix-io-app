import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import { RedemptionRoutesEnum } from 'src/shared/enums/routes/redemption-routes-enum';
import ScreenOptionsDefaultConst from 'src/shared/constants/screen-options-default.const';
import { RedemptionScreen } from './screens/redemption/redemption.screen';
import { RedemptionLoading } from './screens/redemption-loading/redemption-loading.screen';
import { RedemptionError } from './screens/redemption-error/redemption-error.screen';
import { RedemptionSuccess } from './screens/redemption-success/redemption-success.screen';

// Styles
const Stack = createNativeStackNavigator();

const RedemptionStack = () => (
  <Stack.Navigator
    screenOptions={ScreenOptionsDefaultConst}
    initialRouteName={RedemptionRoutesEnum.REDEMPTION}
  >
    <Stack.Screen name={RedemptionRoutesEnum.REDEMPTION} component={RedemptionScreen} />
    <Stack.Screen name={RedemptionRoutesEnum.REDEMPTION_LOADING} component={RedemptionLoading} />
    <Stack.Screen name={RedemptionRoutesEnum.REDEMPTION_ERROR} component={RedemptionError} />
    <Stack.Screen name={RedemptionRoutesEnum.REDEMPTION_SUCCESS} component={RedemptionSuccess} />

  </Stack.Navigator>

);

export default RedemptionStack;
