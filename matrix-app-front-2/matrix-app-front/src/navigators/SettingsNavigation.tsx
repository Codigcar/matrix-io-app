/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import PayWithNFC from 'src/screens/CardConfigure/PayWithNFC';
import ConfigureApplePay from 'src/screens/CardConfigure/ConfigureApplePay';
import ConfigureNFC from 'src/screens/CardConfigure/ConfigureNFC';
import CardConfigure from '../screens/CardConfigure/CardConfigureHome';
// Styles
const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const SettingsNavigation = () => (
  <Stack.Navigator screenOptions={defaultConfig} initialRouteName="CardConfigure">
    <Stack.Screen name="CardConfigure" component={CardConfigure} />
    <Stack.Screen name="PayWithNFC" component={PayWithNFC} />
    <Stack.Screen name="ConfigureApplePay" component={ConfigureApplePay} />
    <Stack.Screen name="ConfigureNFC" component={ConfigureNFC} />
  </Stack.Navigator>
);

export default SettingsNavigation;
