import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Box, ScrollBox } from 'src/matrix-ui-components';
import MonthFilter from './MonthFilter';
import { MonthType } from 'src/types/types';
import  { currentDate, dateParse, formatDate } from 'src/utils/date-time/date-time';
interface MonthFilterButtonsPropsType {
  minDate?: string;
  maxMonths: number;
  onSelect?: (month: MonthType) => void;
  testID?: string;
  progress?: boolean;
}

const getLastMonths = (maxMonths: number, date?: string) => {
  const DATE_FORMAT_API = 'YYYY-MM-DD';
  const DATE_FORMAT_DISPLAY = 'MMM';
  const now = currentDate();
  const minDate = date ? dateParse(date) : now.subtract(maxMonths, 'months');
  const months = [];

  for (let i = 0; i < maxMonths + 1; i++) {
    const month = dateParse(minDate.toISOString()).add(i, 'months');
    months.push({
      name: formatDate(month, DATE_FORMAT_DISPLAY),
      startDate: formatDate(month.startOf('month'), DATE_FORMAT_API),
      endDate: formatDate(month.endOf('month'), DATE_FORMAT_API),
      isSelected: i == maxMonths,
    });
  }
  return months.reverse().slice(0, -1);
};

export const MonthFilterButtons = ({
  maxMonths = 3,
  minDate = undefined,
  onSelect = () => {},
  progress
}: MonthFilterButtonsPropsType) => {
  const lastMonths = getLastMonths(maxMonths, minDate);
  const [months, setMonths] = useState<MonthType[]>(lastMonths);

  const onPress = (month: MonthType) => {
    const updatedButtons = months.map((m) => {
      if (m.name === month.name) {
        return { ...m, isSelected: true };
      }
      return { ...m, isSelected: false };
    });

    setMonths(updatedButtons);
    onSelect(month);
  };

  return (
    <ScrollBox
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: RFValue(24) }}
    >
      {months.map((month, index) => (
        <Box key={month.name} ml={index > 0 ? 'spacing-s' : 'spacing-none'}>
          <MonthFilter
            key={month.name}
            onPress={
              () => {
                if(progress){
                  return;
                }
                onPress(month)
              }
            }
            isFocus={month.isSelected}
            label={month.name}
          />
        </Box>
      ))}
    </ScrollBox>
  );
};
