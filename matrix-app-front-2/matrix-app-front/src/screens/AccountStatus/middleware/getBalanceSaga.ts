import {
  CallEffect,
  CancelledEffect,
  ForkEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import GetDataAccountStatus from '../services/getDataAccountStatus';
import { getBalanceReqError, getBalanceSuccess } from '../states/balanceState';

export function* getReqBalance(): Generator<CallEffect<any> | PutEffect<{
  payload: any;
  type: string;
}> | CancelledEffect, void, unknown> {
  try {
    const response = yield call([GetDataAccountStatus, 'getBalance']);
    yield put(getBalanceSuccess(response));
  } catch (error) {
    yield put(getBalanceReqError(error));
  }
}

function* getBalanceSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('balance/getReqBalance', getReqBalance);
}

export default getBalanceSaga;
