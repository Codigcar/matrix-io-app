import { call, put, takeLatest } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';

import { signInSuccess, signInError } from '../states/signInStates';

type userLogin = {
  username: string;
  password: string;
  payload: any;
};

function* signInData(data: userLogin): Saga<any> {
  try {
    const { payload } = data;
    const { username, password } = payload;
    const response = yield call([Auth, 'signIn'], username, password);
    yield put(signInSuccess(response));
  } catch (error) {
    yield put(signInError(error));
  }
}

function* authSaga(): Saga<any> {
  yield takeLatest('signIn/signInData', signInData);
}

export default authSaga;
