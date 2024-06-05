import { combineReducers } from 'redux';

import welcomeReducer from 'src/screens/Welcome/states/welcomeState';
// Amplify Auth
import signInReducer from 'src/utils/auth/states/signInStates';
// Request Card
import BalanceReducer from 'src/screens/AccountStatus/states/balanceState';
import OrdersReducer from 'src/screens/AccountStatus/states/ordersState';
import PaymentReducer from 'src/screens/CardPayment/states/paymentState';
import RedemptionReducer from 'src/screens/CashBack/states/redemptionState';
import SessionReducer from './states/sessionStates';
import CardsReducer from './states/cardStates';
import showBalanceReducer from './states/showBalance';

export default {
  auth: combineReducers({
    signIn: signInReducer,
  }),
  welcome: welcomeReducer,
  account: combineReducers({
    balance: BalanceReducer,
    orders: OrdersReducer,
    payment: PaymentReducer,
  }),
  session: SessionReducer,
  cards: CardsReducer,
  redemption: RedemptionReducer,
  showBalance: showBalanceReducer,
};
