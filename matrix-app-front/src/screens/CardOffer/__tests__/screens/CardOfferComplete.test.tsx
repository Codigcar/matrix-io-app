import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CardOfferComplete from '../../CardOfferComplete/CardOfferComplete';
import useCardOfferComplete from '../../CardOfferComplete/hooks/useCardOfferComplete';
import { string } from '../../shared/strings/string';
import { testID } from '../../shared/strings/testID';

jest.mock('react-native-localize', () => ({
  getTimeZone: jest.fn(() => 'es'),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../../CardOfferComplete/hooks/useCardOfferComplete', () => ({
  __esModule: true,
  default: jest.fn((props) => ({
    onPressContinue: jest.fn(),
    onPressBackArrow: jest.fn(),
    getLocale: jest.fn(() => 'es'),
    ...props,
  })),
}));

describe('CardOfferComplete Component', () => {
  test('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SafeAreaProvider>
          <CardOfferComplete navigation={{}} route={{ params: {} }} />
        </SafeAreaProvider>
      </ThemeProvider>,
    );

    expect(getByText(string.cardOfferCompleteTitle)).toBeTruthy();
    expect(getByText(string.cardOfferCompleteSubtitle)).toBeTruthy();
    expect(getByTestId(testID.continueButtonId)).toBeTruthy();
  });

  test('fires onPressContinue function on button press', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SafeAreaProvider>
          <CardOfferComplete navigation={{}} route={{ params: {} }} />
        </SafeAreaProvider>
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId(testID.continueButtonId));

    const { onPressContinue } = useCardOfferComplete.mock.results[0].value;

    expect(onPressContinue).toHaveBeenCalled();
  });
});
