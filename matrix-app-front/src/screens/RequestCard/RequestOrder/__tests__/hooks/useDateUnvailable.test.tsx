import React from 'react';
import { getCalendar } from 'src/api/PhysicalCardServices';
import { STATUS_AVAILABLE_DAY } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useDateUnvailableError from '../../hooks/useDateUnvailableError';

jest.mock('@react-native-firebase/crashlytics', () => () => ({
  log: jest.fn(),
  setAttributes: jest.fn(),
  recordError: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/api/PhysicalCardServices', () => ({
  getCalendar: jest.fn(),
}));

const mockNavigation: any = {
  push: jest.fn(),
  navigate: jest.fn(),
};

const mockProps = {
  navigation: mockNavigation,
  route: {
    params: {
      address: {
        district: { code: '000234' },
      },
      isEditing: false,
      contact: {},
      onboarding: true,
    },
  },
};

describe('useDateUnvailableError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('goToSchedule navigates to schedule screen on successful API call', async () => {
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]);

    const mockCalendarResponse = {
      rangeDetail: [
        {
          dayData: {
            dayStatus: STATUS_AVAILABLE_DAY,
            day: '2024-01-01',
            innings: [{ status: STATUS_AVAILABLE_DAY }],
          },
        },
      ],
    };
    getCalendar.mockResolvedValue(mockCalendarResponse);

    const { goToSchedule } = useDateUnvailableError(mockProps);
    await goToSchedule();

    expect(getCalendar).toHaveBeenCalledWith('000234');
    expect(mockNavigation.push).toHaveBeenCalledWith(navigationScreenNames.physicalCard.schedule, {
      isEditing: false,
      contact: {},
      address: {
        district: { code: '000234' },
      },
      calendarDaysList: mockCalendarResponse.rangeDetail,
      inningAvailable: mockCalendarResponse.rangeDetail[0].dayData.innings[0],
      dateAvailable: '2024-01-01',
      onboarding: true,
    });
  });

  it('handles errors and navigates to generic error screen on API failure', async () => {
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]);
    getCalendar.mockRejectedValue(new Error('API Error'));

    const { goToSchedule } = useDateUnvailableError(mockProps);
    await goToSchedule();

    expect(getCalendar).toHaveBeenCalledWith('000234');
    expect(mockNavigation.navigate).toHaveBeenCalledWith(navigationScreenNames.genericError);
  });
});
