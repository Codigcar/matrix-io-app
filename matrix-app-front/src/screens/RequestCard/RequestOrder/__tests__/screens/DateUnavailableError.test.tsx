import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import DateUnavailableErrorScreen from '../../screens/DateUnavailableError';
import useDateUnvailableError from '../../hooks/useDateUnvailableError';

jest.mock('../../hooks/useDateUnvailableError');

describe('DateUnavailableErrorScreen', () => {
  let mockNavigation: {
    push: jest.Mock;
  };

  beforeEach(() => {
    mockNavigation = { push: jest.fn() };
  });

  it('renders correctly', () => {
    const mockUseDateUnavailableError = useDateUnvailableError as jest.MockedFunction<
      typeof useDateUnvailableError
    >;
    mockUseDateUnavailableError.mockReturnValue({ goToSchedule: jest.fn(), isLoading: false });

    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <DateUnavailableErrorScreen navigation={mockNavigation} />
      </ThemeProvider>,
    );

    expect(getByText(string.requestCardErrorScheduleUnavailableTitle)).toBeDefined();
    expect(getByText(string.requestCardErrorScheduleUnavailableSubtitle)).toBeDefined();
    expect(getByText(string.requestCardErrorScheduleUnavailableDescription)).toBeDefined();
  });

  it('navigates to schedule screen on button press', async () => {
    const mockUseDateUnavailableError = useDateUnvailableError as jest.MockedFunction<
      typeof useDateUnvailableError
    >;
    const mockGoToSchedule = jest.fn();
    mockUseDateUnavailableError.mockReturnValue({
      goToSchedule: mockGoToSchedule,
      isLoading: false,
    });

    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <DateUnavailableErrorScreen navigation={mockNavigation} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText(string.requestCardErrorScheduleUnavailableButton));

    await waitFor(() => expect(mockGoToSchedule).toHaveBeenCalled());
  });
});
