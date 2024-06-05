import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import NoCardOffer from '../../NoCardOffer/NoCardOffer';
import useNoCardOffer from '../../NoCardOffer/hooks/useNoCardOffer';
import { string } from '../../shared/strings/string';
import { testID } from '../../shared/strings/testID';

jest.mock('../../NoCardOffer/hooks/useNoCardOffer', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onPressContinue: jest.fn(),
  })),
}));

describe('NoCardOffer Screen', () => {
  test('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <NoCardOffer navigation={{}} route={{ params: {} }} />
      </ThemeProvider>,
    );

    expect(getByText(string.noCardOfferMessage)).toBeTruthy();
    expect(getByText(string.noCardOfferTitle)).toBeTruthy();
    expect(getByText(string.noCardOfferSubtitle)).toBeTruthy();
    expect(getByTestId(testID.continueButtonId)).toBeTruthy();
  });

  test('fires onPressContinue function on button press', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <NoCardOffer navigation={{}} route={{ params: {} }} />
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId(testID.continueButtonId));

    const { onPressContinue } = useNoCardOffer.mock.results[0].value;

    expect(onPressContinue).toHaveBeenCalled();
  });
});
