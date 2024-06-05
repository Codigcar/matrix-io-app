import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CommonActions } from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { resetNavigation } from 'src/utils/navigationHandler';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import SumaryScreen from '../../screens/Summary';

jest.mock('src/shared/providers/analytics/index', () => ({
  analyticsManagerProvider: {
    logEventWithType: jest.fn(),
  },
  AnalyticsProviderType: { appsFlyer: 'appsFlyer' },
  AFLoggerEvents: {
    physicalCardAcquired: 'physicalCardAcquired',
    physicalCardShowed: 'af_cp_tarjeta_fisica',
  },
}));

jest.mock('lottie-react-native');

const mockNavigation = {
  dispatch: jest.fn(),
};

jest.mock('src/utils/navigationHandler', () => ({
  resetNavigation: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  CommonActions: {
    reset: jest.fn(),
  },
}));

describe('SumaryScreen', () => {
  it('renders correctly', () => {
    const params = {
      date: '2023-01-05',
      inning: '14:00 p.m. hasta las 18:00 p.m.',
      phone: '+51 987 562 345',
      address: {
        address: '123 Main St',
        department: { description: 'Cusco' },
        province: { description: 'Cusco' },
        district: { description: 'Cusco' },
      },
      name: 'John Doe',
      onboarding: true,
    };

    const { getByText } = render(<SumaryScreen route={{ params }} navigation={mockNavigation} />);

    expect(getByText(string.requestCardSumarySubtitleUserData)).toBeDefined();
  });

  it('calls the correct navigation function on button press', () => {
    const params = {
      date: '2023-01-05',
      inning: '14:00 p.m. hasta las 18:00 p.m.',
      phone: '+51 987 562 345',
      address: {
        address: '123 Main St',
        department: { description: 'Lima' },
        province: { description: 'Lima' },
        district: { description: 'Ate' },
      },
      name: 'John Doe',
      onboarding: false,
    };
    const { getByText } = render(<SumaryScreen route={{ params }} navigation={mockNavigation} />);

    fireEvent.press(getByText(string.requestCardSumarySubmit));

    expect(CommonActions.reset).toHaveBeenCalledWith({
      index: 1,
      routes: [{ name: 'BottomTabNavigator', state: { routes: [{ name: 'Card' }] } }],
    });
  });

  it('calls the correct navigation function on button press in onboarding', () => {
    const params = {
      date: '2023-01-05',
      inning: '14:00 p.m. hasta las 18:00 p.m.',
      phone: '+51 987 562 345',
      address: {
        address: '123 Main St',
        department: { description: 'Arequipa' },
        province: { description: 'Arequipa' },
        district: { description: 'Arequipa' },
      },
      name: 'John Doe',
      onboarding: true,
    };

    const { getByText } = render(<SumaryScreen route={{ params }} navigation={mockNavigation} />);

    fireEvent.press(getByText(string.requestCardSumarySubmit));

    expect(resetNavigation).toHaveBeenCalledWith(
      mockNavigation,
      navigationScreenNames.bottomTabNavigator,
    );
  });
});
