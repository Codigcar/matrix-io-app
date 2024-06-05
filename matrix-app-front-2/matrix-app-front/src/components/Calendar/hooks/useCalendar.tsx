import { useEffect, useState } from 'react';
import { formatDate, getDate } from 'src/utils/date-time/date-time';
import { CalendarProps, CalendarDayInterface } from '../types/CalendarInterfaces';

const useCalendar = (props: CalendarProps) => {
  const {
    daysToShow, onSelectDate, initialDay, calendarDaysList,
  } = props;

  const labelDays: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  const [daysToCalendar, setDaysToCalendar] = useState<(CalendarDayInterface | null)[][]>([]);
  const [daySelected, setDaySelected] = useState<string>(initialDay || '');
  const [months, setMonths] = useState<string[]>([]);
  const nextDateAvailable = new Date(calendarDaysList[0].dayData.day);

  const initArrayToCalendar = () => {
    const nextDate = nextDateAvailable;
    const index = parseInt(formatDate(nextDate, 'e'), 10);
    let x = 0;
    const initArray = [];
    if (index < 6) {
      do {
        initArray.push(null);
        x++;
      } while (x <= index);
    }
    return { initArray, startDayOfWeek: index };
  };

  const fixArrayToCalendar = (lastWeek: any[]) => {
    for (let i = 0; i <= 6; i++) {
      if (!lastWeek[i]) lastWeek.push(null);
    }
  };

  const formatDatesToCalendar = (
    dates: any,
    auxMonth: string[],
    x: number,
    y: number,
    nextDays: number,
  ) => {
    do {
      const nextDate = getDate(nextDays, nextDateAvailable);
      const currentMonth = formatDate(nextDate, 'MMMM');
      const dateToCalendar = {
        date: formatDate(nextDate, 'YYYY-MM-DD'),
        dayOfMonth: formatDate(nextDate, 'DD'),
        dayOfWeek: formatDate(nextDate, 'e'),
        dayAndMonth: formatDate(nextDate, 'DD/MM'),
      };
      dates[y].push(dateToCalendar);
      if (x === 6) {
        dates.push([]);
        x = 0;
        y++;
      } else {
        x++;
      }
      if (!auxMonth.includes(currentMonth)) auxMonth.push(currentMonth);
      nextDays++;
    } while (nextDays <= daysToShow);
  };

  const generateDates = () => {
    let nextDays = 1;
    const { initArray, startDayOfWeek } = initArrayToCalendar();
    const dates: any = [initArray];
    let auxMonth: string[] = [formatDate(nextDateAvailable, 'MMMM')];
    let y = 0;
    let x = (startDayOfWeek < 6) ? startDayOfWeek + 1 : 0;
    formatDatesToCalendar(dates, auxMonth, x, y, nextDays);
    fixArrayToCalendar(dates.slice(-1)[0]);
    setDaysToCalendar(dates);
    setMonths(auxMonth);
  };

  useEffect(() => {
    generateDates();
  }, []);

  const handlerPress = (day: string) => {
    onSelectDate(day);
    setDaySelected(day);
  };

  return {
    daySelected,
    daysToCalendar,
    months,
    labelDays,
    handlerPress,
    calendarDaysList,
  };
};

export default useCalendar;
