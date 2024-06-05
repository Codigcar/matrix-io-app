import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReplacementValidationSuccess from 'src/screens/CardReplacement/ReplacementValidationSuccess/ReplacementValidationSuccess';
import ReplacementValidationError from 'src/screens/CardReplacement/ReplacementValidationError/ReplacementValidationError';
import ReplacementSummaryOffer from 'src/screens/CardReplacement/ReplacementSummaryOffer/ReplacementSummaryOffer';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const CardReplacementNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName="ReplacementValidationSuccess"
  >
    <Stack.Screen
      name="ReplacementValidationSuccess"
      component={ReplacementValidationSuccess}
    />
    <Stack.Screen
      name="ReplacementValidationError"
      component={ReplacementValidationError}
    />
    <Stack.Screen
      name="ReplacementSummaryOffer"
      component={ReplacementSummaryOffer}
    />
  </Stack.Navigator>
);

export default CardReplacementNavigation;
