import { useState, useEffect } from 'react';
import { useInterval } from 'usehooks-ts';
import { CronoPropsType } from 'src/types/types';

const useCrono = (props: CronoPropsType) => {
  const formatTime = (value: number): String => ` 00:0${value}`;
  const [time, setTime] = useState<number>(3);

  useInterval(
    () => {
      setTime(time - 1);
    },
    start ? 1000 : null,
  );

  useEffect(() => {
    if (time === 0) {
    }
  }, [time]);

  useEffect(() => {
    console.log('change>>', start.toString());
  }, [start]);

  return {
    formatTime,
    time,
  };
};

export default useCrono;
