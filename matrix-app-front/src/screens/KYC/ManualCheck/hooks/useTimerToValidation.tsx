import { useState } from 'react';
import { INTERVAL_TIME } from 'src/utils/constants';
import useCountDown from 'react-countdown-hook';

const useTimerToValidation = (AWAIT_TIME: number) => {
  const initialTime: number = AWAIT_TIME * 1000;
  const [renderFirstTime, setRenderFirstTime] = useState<boolean>(true);

  const [timeToValidation, {
    start, pause, resume, reset,
  }] = useCountDown(
    initialTime,
    INTERVAL_TIME,
  );

  const startCountDown = (): void => {
    start();
    setRenderFirstTime(false);
  };
  const resetCountDown = (): void => reset();

  const isTimerActive = (): boolean => {
    if (renderFirstTime) {
      return true;
    }
    if (timeToValidation === 0) {
      reset();
      return false;
    }
    return true;
  };

  return {
    startCountDown,
    isTimerActive,
    resetCountDown,
  };
};

export default useTimerToValidation;
