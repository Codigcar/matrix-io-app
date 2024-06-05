import { renderHook, act } from '@testing-library/react-hooks';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useSchedule from '../../hooks/useSchedule';

let mockNavigation: {
  dispatch: jest.Mock<any, any, any>;
  navigate: jest.Mock;
  goBack?: Function;
  reset?: Function;
  setOptions?: Function;
  push?: Function;
};

mockNavigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  push: jest.fn(),
};

const mockProps = {
  navigation: mockNavigation,
  route: {
    params: {
      address: { district: { code: 'exampleCode' } },
      inningAvailable: { name: 'Morning', status: 'AVAILABLE', schedule: '9:00 a.m. a 12:00 p.m.' },
      dateAvailable: '2024-01-01',
      isEditing: false,
      contact: {},
      calendarDaysList: [
        {
          dayData: {
            day: '2024-01-01',
            innings: [
              {
                name: 'Morning',
                status: 'AVAILABLE',
                schedule: '9:00 a.m. a 12:00 p.m.',
              },
            ],
          },
        },
      ],
      lastAddress: {},
      lastInning: {
        date: '2024-01-01',
        inning: { name: 'Afternoon', status: 'AVAILABLE', schedule: '1:00 p.m. a 5:00 p.m.' },
      },
      onboarding: true,
    },
  },
};

jest.mock('src/utils/date-time/date-time', () => ({
  formatDate: jest.fn((date, format) => date),
}));

jest.mock('src/api/PhysicalCardServices', () => ({
  getCalendar: jest.fn(() => ({
    rangeDetail: [
      {
        dayData: {
          dayStatus: 'AVAILABLE',
          day: '2024-01-01',
          innings: [
            {
              name: 'Morning',
              status: 'AVAILABLE',
              schedule: '9:00 a.m. a 12:00 p.m.',
            },
          ],
        },
      },
    ],
  })),
}));

beforeEach(() => {
  mockNavigation = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
  };
});
describe('useSchedule', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSchedule(mockProps));

    expect(result.current.isEditing).toBe(false);
    expect(result.current.date).toBe('2024-01-01');
    expect(result.current.inningSelected).toEqual({
      name: 'Morning',
      status: 'AVAILABLE',
      schedule: '9:00 a.m. a 12:00 p.m.',
    });
  });

  it('should update date and inningSelected on user actions', async () => {
    const { result } = renderHook(() => useSchedule(mockProps));

    act(() => {
      result.current.setDate('2024-02-01');
    });
    expect(result.current.date).toBe('2024-02-01');

    act(() =>
      result.current.setInningSelected({
        name: 'Afternoon',
        status: 'AVAILABLE',
        schedule: '1:00 p.m. a 5:00 p.m.',
      }),
    );
    expect(result.current.inningSelected).toEqual({
      name: 'Afternoon',
      status: 'AVAILABLE',
      schedule: '1:00 p.m. a 5:00 p.m.',
    });
  });

  it('should navigate to the correct screen on onSubmit', () => {
    const { result } = renderHook(() => useSchedule(mockProps));

    jest.spyOn(result.current, 'onSubmit');
    jest.spyOn(mockNavigation, 'navigate');

    act(() => {
      result.current.onSubmit();
    });
    expect(result.current.onSubmit).toHaveBeenCalled();
  });

  it('should navigate to goBack when not editing', () => {
    const mockPropsExample = {
      navigation: mockNavigation,
      route: {
        params: {
          address: { district: { code: 'exampleCode' } },
          inningAvailable: {
            name: 'Morning',
            status: 'AVAILABLE',
            schedule: '9:00 a.m. a 12:00 p.m.',
          },
          dateAvailable: '2024-01-01',
          isEditing: false,
          contact: {},
          calendarDaysList: [
            {
              dayData: {
                day: '2024-01-01',
                innings: [
                  {
                    name: 'Morning',
                    status: 'AVAILABLE',
                    schedule: '9:00 a.m. a 12:00 p.m.',
                  },
                ],
              },
            },
          ],
          lastAddress: {},
          lastInning: {
            date: '2024-01-01',
            inning: { name: 'Afternoon', status: 'AVAILABLE', schedule: '1:00 p.m. a 5:00 p.m.' },
          },
          onboarding: true,
        },
      },
    };

    const { result } = renderHook(() => useSchedule(mockPropsExample));

    act(() => {
      result.current.goBack();
    });

    expect(mockNavigation.goBack).toHaveBeenCalled();
    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to form screen when editing', () => {
    const mockPropsExample = {
      navigation: mockNavigation,
      route: {
        params: {
          address: { district: { code: 'exampleCode' } },
          inningAvailable: {
            name: 'Morning',
            status: 'AVAILABLE',
            schedule: '9:00 a.m. a 12:00 p.m.',
          },
          dateAvailable: '2024-01-01',
          isEditing: true,
          contact: {},
          calendarDaysList: [
            {
              dayData: {
                day: '2024-01-01',
                innings: [
                  {
                    name: 'Morning',
                    status: 'AVAILABLE',
                    schedule: '9:00 a.m. a 12:00 p.m.',
                  },
                ],
              },
            },
          ],
          lastAddress: {},
          lastInning: {
            date: '2024-01-01',
            inning: { name: 'Morning', status: 'AVAILABLE', schedule: '9:00 a.m. a 12:00 p.m.' },
          },
          onboarding: true,
        },
      },
    };

    const { result } = renderHook(() => useSchedule(mockPropsExample));

    act(() => {
      result.current.goBack();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith(navigationScreenNames.physicalCard.form, {
      contact: {},
      address: {},
      date: '2024-01-01',
      inning: { name: 'Morning', schedule: '9:00 a.m. a 12:00 p.m.', status: 'AVAILABLE' },
      calendarDaysList: [
        {
          dayData: {
            day: '2024-01-01',
            innings: [
              {
                name: 'Morning',
                schedule: '9:00 a.m. a 12:00 p.m.',
                status: 'AVAILABLE',
              },
            ],
          },
        },
      ],
      onboarding: true,
    });
  });
});
