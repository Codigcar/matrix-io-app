import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenOptionsDefaultConst from 'src/shared/constants/screen-options-default.const';
import { BenefitsRoutesEnum } from 'src/shared/enums/routes/benefits-routes.enum';
import BenefitsListScreen from './modules/benefits-list/benefits-list.screen';
import BenefitDetailsScreen from './modules/benefit-details/benefit-details.screen';

const Stack = createNativeStackNavigator();

const BenefitsStack = () => (
  <Stack.Navigator
    screenOptions={ScreenOptionsDefaultConst}
    initialRouteName={BenefitsRoutesEnum.BENEFITS_LIST}
  >
    <Stack.Screen name={BenefitsRoutesEnum.BENEFITS_LIST} component={BenefitsListScreen} />
    <Stack.Screen name={BenefitsRoutesEnum.BENEFIT_DETAILS} component={BenefitDetailsScreen} />
  </Stack.Navigator>
);

export default BenefitsStack;
