import {
  CallEffect,
  CancelledEffect,
  ForkEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import GetPaymentMethod from '../services/getPaymentMethodStatus';
import { getPaymentSuccess, getPaymentReqError } from '../states/paymentState';

export function* getReqPaymentMethod(): Generator<CallEffect<any> | PutEffect<{
  payload: any;
  type: string;
}> | CancelledEffect, void, unknown> {
  try {
    const response = yield call([GetPaymentMethod, 'getPaymentMethod']);
    yield put(getPaymentSuccess(response));
  } catch (error) {
    yield put(getPaymentReqError(error));
  }
}

function* getPaymentMethodSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('payment/getReqPaymentMethod', getReqPaymentMethod);
}

export default getPaymentMethodSaga;
