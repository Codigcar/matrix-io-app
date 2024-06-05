import React, { useMemo } from 'react';
import { Container, Text, Box, Button, rebrandingTheme } from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationPropsType } from 'src/types/types';
import Calendar from 'src/components/Calendar/Calendar';
import { InningDetail } from 'src/api/types/requestPhysicalCardTypes';
import { STATUS_AVAILABLE_DAY } from 'src/utils/constants';
import useSchedule from '../hooks/useSchedule';
import InningButton from '../../components/InningButton';

export const ScheduleScreen = (props: NavigationPropsType) => {
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
          title: i18n.t('request-card.dateForm.title'),
          textAlign: 'left',
        }}
      >
        <Box flex={1} mx="spacing-m" pb="spacing-s" justifyContent="space-between">
          <Box>
            <Text variant="body13pxRegular" mt="spacing-s">
              {i18n.t('request-card.schedule.message')}
            </Text>
            <Text variant="Subtitle20SemiBold" mt="spacing-s">
              {i18n.t(
                !isEditing ? 'request-card.schedule.title' : 'request-card.schedule.title-editing',
              )}
            </Text>
            <Text variant="body14SemiBold" mt="spacing-s" mb="spacing-xxs">
              {i18n.t('request-card.schedule.scheduleTitle')}
            </Text>
            <Calendar
              initialDay={date}
              onSelectDate={setDate}
              calendarDaysList={calendarDaysList}
              daysToShow={calendarDaysList.length}
            />
            <Text variant="body14SemiBold" mt="spacing-m">
              {i18n.t('request-card.schedule.inningTitle')}
            </Text>
            <Text variant="body13pxRegular" color="complementaryIndigo600" mt="spacing-xxs">
              {i18n.t('request-card.schedule.inningLabel')}
            </Text>
            <Box mt="spacing-xs" flexDirection="row" justifyContent="space-between">
              {Innings}
            </Box>
          </Box>
          <Button
            mb="spacing-xxs"
            variant={!inningSelected ? 'disabled' : 'primary'}
            onPress={onSubmit}
            label={i18n.t('request-card.dateForm.submit')}
            disabled={!inningSelected}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default ScheduleScreen;
