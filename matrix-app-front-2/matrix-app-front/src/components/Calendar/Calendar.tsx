import { Box, Text } from 'matrix-ui-components';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import React, { useMemo } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { s } from 'src/utils/sizes';
import { STATUS_AVAILABLE_DAY } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import CalendarDayAvailable from './components/CalendarDayAvailable';
import CalendarDayNotAvailable from './components/CalendarDayNotAvailable';
import CalendarDayBox from './components/CalendarDayBox';
import useCalendar from './hooks/useCalendar';
import { CalendarDayInterface, CalendarProps } from './types/CalendarInterfaces';

const Calendar = (props: CalendarProps) => {
  const {
    daySelected,
    daysToCalendar,
    months,
    labelDays,
    handlerPress,
    calendarDaysList,
  } = useCalendar(props);

  const isDayAvailableList = (date: CalendarDayInterface | null) =>
    calendarDaysList.find(
      (element) => element.dayData.day === date?.date
      && element.dayData.dayStatus !== STATUS_AVAILABLE_DAY,
    );

  const CalendarDay = (date: CalendarDayInterface) =>
    (isDayAvailableList(date) ? (
      <CalendarDayNotAvailable day={date.dayOfMonth} key={date.date} />
    ) : (
      <CalendarDayAvailable
        key={date.date}
        daySelected={daySelected}
        calendarDay={date}
        onPress={() => handlerPress(date.date)}
      />
    ));

  const CalendarElement = (date: CalendarDayInterface | null, indx: number) =>
    (date ? CalendarDay(date) : <CalendarDayBox key={indx} bgColor="transparent" />);

  const CalendarDays = useMemo(
    () =>
      daysToCalendar.map((week: (CalendarDayInterface | null)[], index) => (
        <Box flexDirection="row" width={s(320)} justifyContent="space-between" key={index}>
          {week.map((date: CalendarDayInterface | null, idx) => CalendarElement(date, idx))}
        </Box>
      )),
    [daySelected, daysToCalendar],
  );

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box>
        <Text variant="body13pxRegular" color="complementaryIndigo600">
          {`${i18n.t('request-card.schedule.weekTitle')} ${months.join(' / ')}`}
        </Text>
      </Box>
      <Box alignItems="center">
        <Box flexDirection="row" width={s(320)} justifyContent="space-between">
          {labelDays.map((day) => (
            <CalendarDayBox bgColor="transparent" key={day}>
              <Text variant="body13Regular" color="primary400">
                {day}
              </Text>
            </CalendarDayBox>
          ))}
        </Box>
        <Box flexDirection="column">{CalendarDays}</Box>
      </Box>
    </ThemeProvider>
  );
};
export default Calendar;

Calendar.defaultProps = {
  daysToShow: 14,
  onSelectDate: () => {},
};
