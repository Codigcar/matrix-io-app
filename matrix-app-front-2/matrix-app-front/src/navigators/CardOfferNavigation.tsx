import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OfferDetails from 'src/screens/CardOffer/OfferDetails/OfferDetails';
import CardDocuments from 'src/screens/CardOffer/CardDocuments/CardDocuments';
import CardDocumentDetail from 'src/screens/CardOffer/CardDocumentDetail/CardDocumentDetail';
import CardOfferComplete from 'src/screens/CardOffer/CardOfferComplete/CardOfferComplete';
import NoCardOffer from 'src/screens/CardOffer/NoCardOffer/NoCardOffer';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const disableSwipeBack = {
  gestureEnabled: false,
};

const CardOfferNavigation = () => (
  <Stack.Navigator
    screenOptions={defaultConfig}
    initialRouteName={navigationScreenNames.cardOfferDetails}
  >
    <Stack.Screen
      name={navigationScreenNames.cardOfferDetails}
      component={OfferDetails}
      options={disableSwipeBack}
    />
    <Stack.Screen
      name={navigationScreenNames.cardDocuments}
      component={CardDocuments}
    />
    <Stack.Screen
      name={navigationScreenNames.cardDocumentDetail}
      component={CardDocumentDetail}
    />
    <Stack.Screen
      name={navigationScreenNames.cardOfferComplete}
      component={CardOfferComplete}
      options={disableSwipeBack}
    />
    <Stack.Screen
      name={navigationScreenNames.noCardOffer}
      component={NoCardOffer}
      options={disableSwipeBack}
    />
  </Stack.Navigator>
);

export default CardOfferNavigation;
