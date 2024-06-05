import { useState } from 'react';
import { CalendarDetails, InningDetail } from 'src/api/types/requestPhysicalCardTypes';
import { NavigationPropsType } from 'src/types/types';
import { formatDate } from 'src/utils/date-time/date-time';
import navigationScreenNames from 'src/utils/navigationScreenNames';

const useSchedule = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;

  const {
    address,
    inningAvailable,
    dateAvailable,
    isEditing,
    contact,
    calendarDaysList,
    lastAddress,
    lastInning,
    onboarding,
  } = params;

  const tomorrow = formatDate(dateAvailable, 'YYYY-MM-DD');
  const [date, setDate] = useState(tomorrow);
  const [inningSelected, setInningSelected] = useState<InningDetail|null>(inningAvailable);

  const findDayInnings: CalendarDetails = calendarDaysList.find(
    (element: CalendarDetails) => element.dayData.day === date.toString(),
  );

  const goBack = () => {
    if (!isEditing) {
      navigation.goBack();
    } else {
      navigation.navigate(navigationScreenNames.physicalCard.form, {
        contact,
        address: lastAddress,
        date: lastInning.date,
        inning: lastInning.inning,
        calendarDaysList,
        onboarding,
      });
    }
  };

  const onSubmit = () => {
    navigation.navigate(navigationScreenNames.physicalCard.form, {
      contact,
      address,
      date,
      inning: inningSelected,
      calendarDaysList,
      onboarding,
    });
  };

  return {
    isEditing,
    setDate,
    date,
    inningSelected,
    setInningSelected,
    onSubmit,
    goBack,
    calendarDaysList,
    findDayInnings,
  };
};

export default useSchedule;
