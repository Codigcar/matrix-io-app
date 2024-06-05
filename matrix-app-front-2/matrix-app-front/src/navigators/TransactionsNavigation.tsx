import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import TransactionsScreen from 'src/screens/Transactions/List/screens/Transactions';
import TransactionDetailScreen from 'src/screens/Transactions/Detail/screens/transactionDetail-screen';

const Stack = createNativeStackNavigator();

const defaultConfig = {
  headerShown: false,
};

const TransactionsNavigation = () => (
  <Stack.Navigator screenOptions={defaultConfig} initialRouteName="Transactions">
    <Stack.Screen name="Transactions" component={TransactionsScreen} />
    <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
  </Stack.Navigator>
);

export default TransactionsNavigation;
