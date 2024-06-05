import { CalendarDetails } from 'src/api/types/requestPhysicalCardTypes';

export interface CalendarDayInterface {
  date: string;
  dayOfMonth: string;
  dayOfWeek: string;
  dayAndMonth: string;
}

export interface CalendarProps {
  daysToShow: number;
  onSelectDate: (day: string) => void;
  initialDay?: string;
  calendarDaysList: CalendarDetails[];
}
