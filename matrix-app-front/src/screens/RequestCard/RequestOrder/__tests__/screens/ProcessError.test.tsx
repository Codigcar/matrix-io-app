import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import ProcessErrorScreen from '../../screens/ProcessError';

describe('ProcessErrorScreen', () => {
  let mockNavigation: {
    dispatch: jest.Mock<any, any, any>;
    navigate?: Function;
    goBack?: Function;
    reset?: Function;
    setOptions?: Function;
    push?: Function;
  };

  beforeEach(() => {
    mockNavigation = { dispatch: jest.fn() };
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <ProcessErrorScreen navigation={mockNavigation} />
      </ThemeProvider>,
    );

    expect(getByTestId('processErrorScreen')).toBeDefined();
    expect(getByText(string.requestCardErrorProcessErrorTitle)).toBeDefined();
    expect(getByText(string.requestCardErrorProcessErrorSubtitle)).toBeDefined();
  });

  it('calls the correct function on button press', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <ProcessErrorScreen navigation={mockNavigation} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText(string.requestCardErrorProcessErrorButon));
  });
});
