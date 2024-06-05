import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { getValue, saveValue } from 'src/utils/AsyncStorageHandler';
import { MAX_FAILED_ATTEMPTS_FOR_BLOCK, COUNT_TO_SHOW_ALERT_PREV_BLOCK, RESET_FAILED_ATTEMPTS_TIME } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';

const LOGIN_ATTEMPTS_KEY = 'login-attempts';

export const resetAttempts = async (username: any) => {
  const loginAttempts: any = await getValue(LOGIN_ATTEMPTS_KEY);

  if (loginAttempts && loginAttempts !== null) {
    const resetLoginAttempts = loginAttempts?.filter((att: any) => att.username !== username);
    await saveValue(LOGIN_ATTEMPTS_KEY, resetLoginAttempts);
  }
};

export const registerAttempts = async (username: any) => {
  let loginAttempts: any = await getValue(LOGIN_ATTEMPTS_KEY);

  const indexAttempts = (loginAttempts || [])
    .findIndex((user: any) => user.username === username);

  if (!loginAttempts) {
    loginAttempts = [{ username, attempts: 1, dateTime: Date.now() }];
  } else if (indexAttempts !== -1) {
    const findUser = loginAttempts[indexAttempts];

    const limitResetAttempts = new Date(findUser.dateTime).getTime() + RESET_FAILED_ATTEMPTS_TIME;
    const currentTime = Date.now();
    if (currentTime >= limitResetAttempts) findUser.attempts = 0;

    if (findUser.attempts < MAX_FAILED_ATTEMPTS_FOR_BLOCK) findUser.attempts += 1;
    loginAttempts[indexAttempts] = { username, attempts: findUser.attempts, dateTime: Date.now() };

    if (findUser.attempts === COUNT_TO_SHOW_ALERT_PREV_BLOCK) {
      showToast({
        type: ToastType.TypeWarning,
        title: i18n.t('login-failed.alert.title'),
        message: i18n.t('login-failed.alert.message'),
      });
    }
  } else {
    loginAttempts = [...loginAttempts, { username, attempts: 1, dateTime: Date.now() }];
  }

  await saveValue(LOGIN_ATTEMPTS_KEY, loginAttempts);
};
