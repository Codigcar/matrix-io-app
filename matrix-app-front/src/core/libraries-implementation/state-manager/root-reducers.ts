import { combineReducers } from 'redux';

import welcomeReducer from 'src/screens/Welcome/states/welcomeState';
// Amplify Auth
import signInReducer from 'src/utils/auth/states/signInStates';
// Request Card
import RedemptionReducer from './states/credit-card/cashback/redemption.state';
import PaymentMethodReducer from './states/credit-card/payment-method/payment-method.state';
import OrdersReducer from './states/credit-card/credit-card-detail/orders.state';
import BalanceReducer from './states/credit-card/credit-card-detail/balance.state';
import SessionReducer from './states/session/session.state';
import CardsReducer from './states/cards/card.state';
import ShowBalanceReducer from './states/credit-card/credit-card-detail/show-balance';

// TODO: Add all reducers here
export default {
  auth: combineReducers({
    signIn: signInReducer,
  }),
  welcome: welcomeReducer,
  account: combineReducers({
    balance: BalanceReducer,
    orders: OrdersReducer,
    paymentMethod: PaymentMethodReducer,
  }),
  session: SessionReducer,
  cards: CardsReducer,
  redemption: RedemptionReducer,
  showBalance: ShowBalanceReducer,
};
