import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { AccountStatusScreen } from './screens/account-status/account-status.screen';
import { AddingPaymentMethod } from './screens/adding-payment-method/adding-payment-method.screen';
import { AddDebitCardCulqi } from './screens/add-debit-card-culqi/add-debit-card-culqi.screen';
import { CardPayment } from './screens/payment/payment.screen';
import { PaymentError } from './screens/payment-error/payment-error.screen';
import { PaymentLoading } from './screens/payment-loading/payment-loading.screen';
import { PaymentSuccess } from './screens/payment-success/payment-success.screen';
import { ListAccountStatements } from './screens/list-account-statements/list-account-statements.screen';

const Stack = createNativeStackNavigator();

const ScreenOptionsCardPayment = {
  headerShown: false,
  gestureEnabled: false,
};

const CardPaymentStack = () => (
  <Stack.Navigator
    screenOptions={ScreenOptionsCardPayment}
    initialRouteName={CardPaymentRoutesEnum.ACCOUNT_STATUS}
  >
    <Stack.Screen
      name={CardPaymentRoutesEnum.ACCOUNT_STATUS}
      component={AccountStatusScreen}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.CARD_PAYMENT}
      component={CardPayment}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.ADD_DEBIT_CARD_CULQUI}
      component={AddDebitCardCulqi}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.LIST_ACCOUNT_STATEMENTS}
      component={ListAccountStatements}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.ADDING_PAYMENT_METHOD}
      component={AddingPaymentMethod}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.PAYMENT_ERROR}
      component={PaymentError}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.PAYMENT_LOADING}
      component={PaymentLoading}
    />
    <Stack.Screen
      name={CardPaymentRoutesEnum.PAYMENT_SUCCESS}
      component={PaymentSuccess}
    />
  </Stack.Navigator>
);

export default CardPaymentStack;
