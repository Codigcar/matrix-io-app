import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { STATUS_AVAILABLE_DAY } from 'src/utils/constants';
import { getCalendar } from 'src/api/PhysicalCardServices';
import { useState } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';

const useDateUnvailableError = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;

  const {
    address, isEditing, contact, onboarding,
  } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goToSchedule = async () => {
    try {
      setIsLoading(true);
      const calendarResponse = await getCalendar(address.district?.code);
      setIsLoading(false);
      if (calendarResponse.rangeDetail) {
        const firstDateAvailable = calendarResponse.rangeDetail.find(
          (element) => element.dayData.dayStatus === STATUS_AVAILABLE_DAY,
        );
        const firstInningAvailable = firstDateAvailable?.dayData.innings.find(
          (inning) => inning.status === STATUS_AVAILABLE_DAY,
        );
        navigation.push(navigationScreenNames.physicalCard.schedule, {
          isEditing,
          contact,
          address,
          calendarDaysList: calendarResponse.rangeDetail,
          inningAvailable: firstInningAvailable,
          dateAvailable: firstDateAvailable?.dayData.day,
          onboarding,
        });
      }
    } catch (error) {
      setIsLoading(false);
      logCrashlytics({
        scope: 'API',
        fileName: 'RequestCard/RequestOrder/hooks/useDateUnvailableError.tsx',
        service: 'PhysicalCardServices.getCalendar',
        error,
      });
      navigation.navigate(navigationScreenNames.genericError);
    }
  };

  return {
    goToSchedule,
    isLoading,
  };
};

export default useDateUnvailableError;
