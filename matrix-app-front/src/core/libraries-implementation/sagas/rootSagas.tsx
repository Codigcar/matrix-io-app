import { all, fork } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';

import signInSaga from 'src/utils/auth/middleware/signInSaga';

export default function* rootSaga(): Saga<any> {
  yield all([
    fork(signInSaga),
  ]);
}
