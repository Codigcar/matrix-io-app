import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { LocationProvider } from 'src/store/states/locationContext';
import { Provider } from 'react-redux';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import { store } from 'src/core/libraries-implementation/state-manager/store';
import ScheduleScreen from '../../screens/Schedule';

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  SafeAreaProvider: ({ children }) => <>{children}</>,
}));

const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  push: jest.fn(),
};

const mockScheduleHook = {
  setInningSelected: jest.fn(),
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
  findDayInnings: {
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
};

beforeEach(() => {
  mockNavigation.goBack.mockClear();
  mockNavigation.navigate.mockClear();
  mockScheduleHook.setInningSelected.mockClear();
});

describe('ScheduleScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <SafeAreaInsetsContext.Provider value={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
        >
          <ThemeProvider theme={rebrandingTheme}>
            <Provider store={store}>
              <LocationProvider>
                <ScheduleScreen navigation={mockNavigation} route={{}} />
              </LocationProvider>
            </Provider>
          </ThemeProvider>
        </SafeAreaInsetsContext.Provider>
      </SafeAreaProvider>,
    );

    expect(getByText(string.requestCardScheduleMessage)).toBeDefined();
  });

  it('calls setInningSelected when the InningButton is pressed', () => {
    const { getByText } = render(
      <SafeAreaProvider>
        <SafeAreaInsetsContext.Provider value={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
        >
          <ThemeProvider theme={rebrandingTheme}>
            <Provider store={store}>
              <LocationProvider>
                <ScheduleScreen navigation={mockNavigation} route={{}} />
              </LocationProvider>
            </Provider>
          </ThemeProvider>
        </SafeAreaInsetsContext.Provider>
      </SafeAreaProvider>,
    );

    fireEvent.press(getByText('9:00 a.m. a 12:00 p.m.'));

    expect(mockScheduleHook.setInningSelected).toHaveBeenCalledWith({
      name: 'Morning',
      status: 'AVAILABLE',
      schedule: '9:00 a.m. a 12:00 p.m.',
    });
  });
});

jest.mock('../../hooks/useSchedule', () => ({
  __esModule: true,
  default: jest.fn(() => mockScheduleHook),
}));
