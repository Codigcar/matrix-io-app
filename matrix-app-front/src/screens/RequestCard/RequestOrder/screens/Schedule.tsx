import React, { useMemo } from 'react';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationPropsType } from 'src/types/types';
import Calendar from 'src/components/Calendar/Calendar';
import { InningDetail } from 'src/api/types/requestPhysicalCardTypes';
import { STATUS_AVAILABLE_DAY } from 'src/utils/constants';
import useSchedule from '../hooks/useSchedule';
import InningButton from '../../components/InningButton';
import { string } from '../../shared/strings/string';

export const ScheduleScreen: React.FC<NavigationPropsType> = (props) => {
  const {
    isEditing,
    setDate,
    inningSelected,
    setInningSelected,
    onSubmit,
    goBack,
    date,
    calendarDaysList,
    findDayInnings,
  } = useSchedule(props);

  const Innings = useMemo(() => {
    const existInning = findDayInnings.dayData.innings.find(
      (inningValue: InningDetail) =>
        inningValue.name === inningSelected?.name && inningValue.status === STATUS_AVAILABLE_DAY,
    );
    if (!existInning) setInningSelected(null);
    return findDayInnings.dayData.innings.map(
      (inning: InningDetail) =>
        inning.status === STATUS_AVAILABLE_DAY && (
          <Box width="48.5%" key={inning.name}>
            <InningButton
              isSelected={inningSelected?.name === inning.name}
              buttonText={inning.schedule}
              onPress={() => setInningSelected(inning)}
            />
          </Box>
        ),
    );
  }, [date, inningSelected]);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        imageBackground={BackgroundNew}
        isHeaderVisible
        goBackNavigate={goBack}
        headerProps={{
          title: string.requestCardDateFormTitle,
          textAlign: 'left',
        }}
      >
        <Box flex={1} mx="spacing-m" pb="spacing-s" justifyContent="space-between">
          <Box>
            <Text variant="body13pxRegular" mt="spacing-s">
              {string.requestCardScheduleMessage}
            </Text>
            <Text variant="Subtitle20SemiBold" mt="spacing-s">
              {!isEditing
                ? string.requestCardScheduleTitle
                : string.requestCardScheduleTitleEditing}
            </Text>
            <Text variant="body14SemiBold" mt="spacing-s" mb="spacing-xxs">
              {string.requestCardScheduleScheduleTitle}
            </Text>
            <Calendar
              initialDay={date}
              onSelectDate={setDate}
              calendarDaysList={calendarDaysList}
              daysToShow={calendarDaysList.length}
            />
            <Text variant="body14SemiBold" mt="spacing-m">
              {string.requestCardScheduleinningTitle}
            </Text>
            <Text variant="body13pxRegular" color="complementaryIndigo600" mt="spacing-xxs">
              {string.requestCardScheduleinningLabel}
            </Text>
            <Box mt="spacing-xs" flexDirection="row" justifyContent="space-between">
              {Innings}
            </Box>
          </Box>
          <Button
            mb="spacing-xxs"
            variant={!inningSelected ? 'disabled' : 'primary'}
            onPress={onSubmit}
            label={string.requestCardDateformSubmit}
            disabled={!inningSelected}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default ScheduleScreen;
