import { Box, Text, TouchableOpacityBox } from 'matrix-ui-components';
import React, { ReactChildren } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { CalendarDayInterface } from '../types/CalendarInterfaces';
import CalendarDayBox from './CalendarDayBox';

interface CalendarDayBoxProps {
  calendarDay: CalendarDayInterface;
  daySelected: string;
  onPress: () => void;
}

const CalendarDayAvailable = ({ calendarDay, daySelected, onPress }: CalendarDayBoxProps) => {
  const isSelected = calendarDay.date === daySelected;
  const textColor = isSelected ? 'primary000' : 'primary1000';
  const bgColor = isSelected ? 'primary1000' : 'primary100';
  return (
    <TouchableOpacityBox onPress={onPress} key={calendarDay.date}>
      <CalendarDayBox bgColor={bgColor}>
        <Text variant="body13pxSemiBold" color={textColor}>
          {calendarDay.dayOfMonth}
        </Text>
      </CalendarDayBox>
    </TouchableOpacityBox>
  );
};

export default CalendarDayAvailable;
