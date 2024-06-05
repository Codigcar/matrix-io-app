import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenOptionsDefaultConst from 'src/shared/constants/screen-options-default.const';
import { CardReplacementRoutesEnum } from 'src/shared/enums/routes/card-replacement-routes.enum';
import { ReplacementValidationSuccessScreen } from './screens/replacement-validation-success/replacement-validation-success.screen';
import { ReplacementValidationErrorScreen } from './screens/replacement-validation-error/replacement-validation-error.screen';
import { ReplacementSummaryOfferScreen } from './screens/replacement-summary-offer/replacement-summary-offer.screen';

const Stack = createNativeStackNavigator();

const CardReplacementStack = () => (
  <Stack.Navigator
    screenOptions={ScreenOptionsDefaultConst}
    initialRouteName={CardReplacementRoutesEnum.REPLACEMENT_VALIDATION_SUCCESS}
  >
    <Stack.Screen
      name={CardReplacementRoutesEnum.REPLACEMENT_VALIDATION_SUCCESS}
      component={ReplacementValidationSuccessScreen}
    />
    <Stack.Screen
      name={CardReplacementRoutesEnum.REPLACEMENT_VALIDATION_ERROR}
      component={ReplacementValidationErrorScreen}
    />
    <Stack.Screen
      name={CardReplacementRoutesEnum.REPLACEMENT_SUMMARY_OFFER}
      component={ReplacementSummaryOfferScreen}
    />
  </Stack.Navigator>
);

export default CardReplacementStack;
