import { all, fork } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import signInSaga from 'src/utils/auth/middleware/signInSaga';
// Account Status
import getBalanceSaga from 'src/screens/AccountStatus/middleware/getBalanceSaga';
import getOrdersSaga from 'src/screens/AccountStatus/middleware/getOrdersSaga';
import getPaymentMethodSaga from 'src/screens/CardPayment/middleware/getPaymentSaga';

export default function* rootSaga(): Saga<any> {
  yield all([
    fork(signInSaga),
    fork(getBalanceSaga),
    fork(getOrdersSaga),
    fork(getPaymentMethodSaga),
  ]);
}
