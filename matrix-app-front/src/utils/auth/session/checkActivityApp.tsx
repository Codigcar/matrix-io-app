import Helpers from 'src/utils/Helpers';
import { SESSION_TIMEOUT_TOKEN_SECONDS } from 'src/utils/constants';
import { RefreshToken } from 'src/api/AuthServices';
import { store } from 'src/core/libraries-implementation/state-manager/store';
import {
  setToken as SetAuthTokenAction,
  setToken as SetSessionTokenAction,
  sessionExpiredTimeout,
} from 'src/core/libraries-implementation/state-manager/states';
import { setLastDateTouch } from '../states/signInStates';

const checkActivityApp = async () => {
  const { token, tokenStartDate, inactivityTimeoutSeconds } = store.getState().session;
  const { lastDateTouch } = store.getState().auth.signIn;
  const currentMoment = new Date();
  if (token) {
    if (
      Helpers.diffDatesInSeconds(currentMoment, tokenStartDate || currentMoment)
        > SESSION_TIMEOUT_TOKEN_SECONDS
      && Helpers.diffDatesInSeconds(currentMoment, lastDateTouch) < inactivityTimeoutSeconds
    ) {
      // Refresh Token App
      try {
        const newAuthToken = await RefreshToken();
        store.dispatch(SetAuthTokenAction(newAuthToken));
        store.dispatch(SetSessionTokenAction(newAuthToken));
      } catch (error) {
        console.log(`Refresh Token App error: ${error}`);
        store.dispatch(sessionExpiredTimeout(true));
      }
    }
    if (Helpers.diffDatesInSeconds(currentMoment, lastDateTouch) > inactivityTimeoutSeconds) {
      store.dispatch(sessionExpiredTimeout(true));
    }
  }
  store.dispatch(setLastDateTouch(currentMoment));
};

export default checkActivityApp;
