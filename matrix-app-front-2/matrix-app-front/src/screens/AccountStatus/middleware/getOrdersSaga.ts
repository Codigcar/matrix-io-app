import {
  CallEffect,
  ForkEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import GetDataAccountStatus from '../services/getDataAccountStatus';
import { getOrdersReqError, getOrdersSuccess } from '../states/ordersState';

export function* getReqOrders(): Generator<CallEffect<any> | PutEffect<{
  payload: any;
  type: string;
}>, void, unknown> {
  try {
    const response = yield call([GetDataAccountStatus, 'getOrders']);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersReqError(error));
  }
}

function* getOrdersSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('orders/getReqOrders', getReqOrders);
}

export default getOrdersSaga;
