import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import CardDocuments from '../../CardDocuments/CardDocuments';
import { string } from '../../shared/strings/string';
import { testID } from '../../shared/strings/testID';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => <>{children}</>,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../../CardDocuments/hooks/useCardDocuments', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onDownloadDocument: jest.fn(),
    onPressViewDocument: jest.fn(),
    onPressBackArrow: jest.fn(),
    loading: false,
  })),
}));

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

describe('CardDocuments Component', () => {
  test('renders document list correctly', async () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SafeAreaProvider>
          <CardDocuments route={{ params: { summarySheet: 'mockSummarySheetUrl' } }} />
        </SafeAreaProvider>
      </ThemeProvider>,
    );

    expect(getByText(string.cardOfferDocumentsTitle)).toBeTruthy();
    expect(getByText(string.cardOfferDocumentsSubtitle)).toBeTruthy();
    expect(getByTestId(`${testID.viewDocumentButtonMultipleId} contract`)).toBeTruthy();
  });

  test('fires download function on button press', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SafeAreaProvider>
          <CardDocuments route={{ params: { summarySheet: 'mockSummarySheetUrl' } }} />
        </SafeAreaProvider>
      </ThemeProvider>,
    );

    fireEvent.press(getByTestId(`${testID.viewDocumentButtonMultipleId} contract`));
  });
});
