import { Text } from 'matrix-ui-components';
import React from 'react';
import CalendarDayBox from './CalendarDayBox';

const CalendarDayNotAvailable = ({ day }: { day: string }) => {
  return (
    <CalendarDayBox bgColor="primary100">
      <Text variant="body13pxSemiBold" color="primary300">
        {day}
      </Text>
    </CalendarDayBox>
  );
};

export default CalendarDayNotAvailable;
